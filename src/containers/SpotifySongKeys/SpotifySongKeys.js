import React, { Component } from 'react';
import classes from '../../components/UI/css/style.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import Genres from '../../components/Genres/Genres';
import Navigation from '../../components/Navigation/Navigation';
import Spotify from 'spotify-web-api-js';
import axios from 'axios';
import Artists from '../../components/Artists/Artists';

const spotifyAPI = new Spotify();

class SpotifySongKeys extends Component {

    constructor(props) {
        super(props);

        this.state = {
            favArtists: [],
            favGenres: [],
            loggedIn: this.props.loggedIn,
            token: this.props.token,
            user: {
                userName: '',
                profileImgUrl: ''
            }
        }

        this.getProfileHandler();
        this.getArtists();
        this.getGenres();
    }

    setAccessToken = () => {
        if (!spotifyAPI.getAccessToken()) {
            if (this.state.token) {
                spotifyAPI.setAccessToken(this.state.token)
            } else if(localStorage.getItem('token_ls')){
                spotifyAPI.setAccessToken(localStorage.getItem('token_ls'))
            } else {
                console.log('No token to SET');
            }
        };
    }

    getArtists = () => {
        this.setAccessToken();

        spotifyAPI.getMyTopArtists({ limit: 6 }).then(response => {
            const favArtists = [];

            const topArtists = Object.values(response.items)
            topArtists.map(topArtist => (
                //Get Artist URL
                spotifyAPI.getArtist(topArtist.id).then(res => {
                    axios.get(res.href).then(artist => {

                        //Get Top Tracks
                        let topTracks = []

                        spotifyAPI.getArtistTopTracks(artist.data.id, 'BR').then(track => {
                            for (let i in track.tracks) {

                                //Get Track Info
                                let trackInfo = {};

                                trackInfo.album_img = track.tracks[i].album.images[0].url;

                                spotifyAPI.getAudioFeaturesForTrack(track.tracks[i].id).then(response => {
                                    trackInfo.id = response.id;
                                    trackInfo.duration_ms = response.duration_ms;
                                    trackInfo.key = response.key;
                                    trackInfo.mode = response.mode;
                                    trackInfo.tempo = response.tempo;
                                    trackInfo.time_signature = response.time_signature;
                                    trackInfo.acousticness = response.acousticness;
                                    trackInfo.danceability = response.danceability;
                                    trackInfo.energy = response.energy;
                                    trackInfo.instrumentalness = response.instrumentalness;
                                    trackInfo.liveness = response.liveness;
                                    trackInfo.loudness = response.loudness;
                                    trackInfo.speechiness = response.speechiness;
                                    trackInfo.valence = response.valence;
                                }).catch(error => {
                                    console.log('Error while getting audio features from track: ' + error);
                                });

                                topTracks.push(
                                    {
                                        id: track.tracks[i].id,
                                        name: track.tracks[i].name,
                                        trackInfo
                                    }
                                )
                            }
                        })

                        favArtists.push({
                            id: artist.data.id,
                            name: artist.data.name,
                            url: artist.data.external_urls.spotify,
                            followers: artist.data.followers.total,
                            image: artist.data.images[0].url,
                            topTracks
                        })
                    }).catch(error => {
                        console.log("Error on request artist to get artist link: ", error);
                    })
                }).catch(error => {
                    console.log("Error on request artist to Spotify API: ", error);
                })
                //End of Get Artist URL                    
            ));

            this.setState({ ...this.state, favArtists });
        }).catch(error => {
            console.log("Error on request to Spotify API: ", error);
        })
    }

    getGenres = () => {
        this.setAccessToken();

        spotifyAPI.getMyTopArtists({ limit: 6 }).then(response => {
            const artists = Object.values(response.items)

            const favGenres = [];
            artists.map(artist => {
                const genres = Object.values(artist.genres);
                genres.map(genre => (
                    favGenres.push({ name: genre })
                ));
            })

            this.setState({ ...this.state, favGenres });
        }).catch(error => {
            console.log("Error on request to Spotify API: ", error);
        })
    }

    getProfileHandler = () => {
        this.setAccessToken();

        spotifyAPI.getMe().then(response => {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    userName: response.display_name,
                    profileImgUrl: response.images[0].url
                }
            });
        }).catch(error => {
            console.log("Error while getting user information: ", error);
        })
    }

    playSong = (id_track) => {
        this.setAccessToken();

        spotifyAPI.getMyDevices().then(response => {
            if (response.devices.length === 0) {
                console.log('No device has found');
                return;
            }

            let uri = "spotify:track:" + id_track.toString();

            let options = {
                "device_id": response.devices[0].id,
                "uris": [uri]
            }

            spotifyAPI.play(
                options
                , (error, res) => {
                    if (error) {
                        console.log("Error on playing song: ", error)
                    }
                })
        }).catch(error => {
            console.log("Error while getting device", error);
        });
    }

    pauseSong = () => {
        this.setAccessToken();

        spotifyAPI.getMyDevices()
            .then(response => {

                if (response.devices.length === 0) {
                    console.log('No device has found');
                    return;
                }

                let options = {
                    "device_id": response.devices[0].id
                }

                spotifyAPI.pause(options, (error, res) => {
                    if (error) {
                        console.log("Error on pausing song: ", error)
                    }
                });

            }).catch(error => {
                console.log("Error while getting device", error);
            });
    }

    componentDidMount() {        
        localStorage.setItem('token_ls', this.state.token);        
    }

    render() {
        return (
            <div className={classes.body}>
                <div className={classes.order}>
                    <Header
                        userName={this.state.user.userName}
                        profileImgUrl={this.state.user.profileImgUrl} />
                    <Navigation />
                    <main className={classes.main}>
                        <Switch>
                            <Route path='/home/artists'
                                render={props => <Artists {...props}
                                    getArtists={this.getArtists}
                                    artists={this.state.favArtists}
                                    play={this.playSong}
                                    pause={this.pauseSong} />} />
                            <Route path='/home/genres'
                                render={props => <Genres {...props}
                                    getGenres={this.getGenresHandler}
                                    genres={this.state.favGenres} />} />
                        </Switch>
                    </main>
                </div>
                <Footer />

                <Redirect
                    to={{
                        pathname: "/home/artists"
                    }} />
            </div>
        )
    }
};

export default SpotifySongKeys;