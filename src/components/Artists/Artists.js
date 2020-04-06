import React, { Component } from 'react';
import classes from '../UI/css/style.module.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import Artist from './Artist/Artist';
import CollapsibleButton from '../UI/CollapsibleButton/CollapsibleButton';
import Track from './Track/Track';

class Artists extends Component {

    render() {
        let artists = this.props.artists;

        return (
            <section className={[classes.flex, classes.artists].join(' ')}>
                <div className={[classes.side_nav, classes.flex_item_3].join(' ')}>
                    {
                        artists.map(artist => {
                            const tracks = artist.topTracks.map(track => {
                                return (
                                    <NavLink
                                        key={artist.id}
                                        to={{
                                            pathname: '/home/artists/track',
                                            search: '?id=' + track.id
                                                + '&id_artist=' + artist.id
                                        }}>
                                        <div className={classes.link}>{track.name}</div>
                                    </NavLink>
                                )
                            });

                            return (
                                <CollapsibleButton
                                    key={artist.id}
                                    title={artist.name}
                                    link_key={artist.id}
                                    link_to={{
                                        pathname: '/home/artists/artist',
                                        search: '?id=' + artist.id
                                    }}>
                                    {tracks}
                                </CollapsibleButton>
                            )
                        })
                    }
                </div>
                <div className={[classes.returnedData, classes.flex_item_9].join(' ')}>
                    <Switch>
                        <Route exact path="/home/artists/track"
                            render={props => <Track {...props}
                                artists={this.props.artists}
                                play={this.props.play}
                                pause={this.props.pause} />} />
                        <Route exact path="/home/artists/artist"
                            render={props => <Artist {...props}
                                artists={this.props.artists} />} />
                    </Switch>
                </div>
            </section >

        )
    }
};

export default Artists;