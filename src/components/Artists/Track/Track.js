import React, { Component } from 'react';
import classes from '../../UI/css/style.module.css';

class Track extends Component {

    getKey = (pKey, pMode) => {
        let result = 'none';
        let mode = pMode === 0 ? ' minor' : ' major';

        switch (pKey) {
            case 0: {
                result = 'C' + mode;
                break;
            }
            case 1: {
                result = 'C#, Db' + mode;
                break;
            }
            case 2: {
                result = 'D' + mode;
                break;
            }
            case 3: {
                result = 'D#, Eb' + mode;
                break;
            }
            case 4: {
                result = 'E' + mode;
                break;
            }
            case 5: {
                result = 'F' + mode;
                break;
            }
            case 6: {
                result = 'F#, Gb' + mode;
                break;
            }
            case 7: {
                result = 'G' + mode;
                break;
            }
            case 8: {
                result = 'G#, Ab' + mode;
                break;
            }
            case 9: {
                result = 'A' + mode;
                break;
            }
            case 10: {
                result = 'A#, Bb' + mode;
                break;
            }
            case 11: {
                result = 'B' + mode;
                break;
            }
            default: {
                result = ''
            }
        }

        return result;
    }

    getDuration = (duration_ms) => {
        let durationMinutes = ((duration_ms / 1000) / 60);
        let durationSeconds = Math.trunc((durationMinutes % 1) * 60);
        durationSeconds = durationSeconds < 10 ? '0' + durationSeconds : durationSeconds;
        let result = Math.trunc(durationMinutes) + ':' + durationSeconds;
        return result;
    }

    getAcousticnessPercentual = (acousticness) => {
        return (acousticness * 100).toFixed(2);
    }

    getTempo = (tempo) => {
        return Math.trunc(tempo);
    }

    getEnergy = (energy) => {
        return (energy * 100).toFixed(2);
    }

    render() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            switch (param[0]) {
                case 'id': {
                    this.id = param[1];
                    break;
                }
                case 'id_artist': {
                    this.id_artist = param[1];
                    break;
                }
                default: {
                    this.id = 0;
                }
            }
        }

        const track = this.props.artists.find((artist, index) => {
            return artist.id === this.id_artist;
        }).topTracks.find((track, index) => {
            return track.id === this.id
        });

        return (
            <React.Fragment>
                <div className={[classes.returnedData_content, classes.flex].join(' ')}>
                    <div className={classes.returnedData_image}>
                        {/* <p>id: {track.id}</p> */}
                        <h1>{track.name}</h1>
                        <div>
                            <img src={track.trackInfo.album_img}
                                className={classes.trackImage}
                                alt={"Album cover"} />
                        </div>
                    </div>
                    <div className={classes.returnedData_info}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <span className={classes.label}>Key:</span>
                                    </td>
                                    <td>
                                        {this.getKey(track.trackInfo.key, track.trackInfo.mode)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className={classes.label}>Tempo(bpm): </span>
                                    </td>
                                    <td>
                                        {this.getTempo(track.trackInfo.tempo)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className={classes.label}>Duration: </span>
                                    </td>
                                    <td>
                                        {this.getDuration(track.trackInfo.duration_ms)}min
                            </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className={classes.label}>Acousticness: </span>
                                    </td>
                                    <td>
                                        {this.getAcousticnessPercentual(track.trackInfo.acousticness)}%
                            </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className={classes.label}>Energy: </span>
                                    </td>
                                    <td>
                                        {this.getEnergy(track.trackInfo.energy)}%
                            </td>
                                </tr>
                                {/* <p>Instrumentalness: {track.trackInfo.instrumentalness}</p> 
                                    <p>Liveness: {track.trackInfo.liveness}</p> 
                                    <p>Loudness: {track.trackInfo.loudness}</p> 
                                    <p>Speechness: {track.trackInfo.speechiness}</p> 
                                    <p>Valence: {track.trackInfo.valence}</p>
                                    <p>Danceability: {track.trackInfo.danceability}</p>
                                    <p>Time Signature: {track.trackInfo.time_signature}</p> */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.player}>
                    <button className={classes.playerButton}
                        onClick={() => this.props.play(track.id)}> > PLAY</button>
                    <button className={classes.playerButton}
                        onClick={() => this.props.pause()}> || PAUSE</button>
                </div>
            </React.Fragment>

        )
    }
};

export default Track;