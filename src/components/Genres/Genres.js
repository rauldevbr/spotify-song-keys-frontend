import React, { Component } from 'react';
import classes from '../UI/css/style.module.css';
import Genre from './Genre/Genre';
import { Switch, Route, NavLink } from 'react-router-dom';

class Genres extends Component {
    render() {        
        return (
            <section className={[classes.flex, classes.genres].join(' ')}>
                <div className={[classes.side_nav, classes.flex_item_3].join(' ')}>
                    {
                        this.props.genres.map((genre, key) => {
                            return (
                                <NavLink key={key}
                                    to={{
                                        pathname: '/home/genres/genre',
                                        search: '?id=' + key + '&name=' + genre.name
                                    }}>
                                    {genre.name}
                                </NavLink>)
                        })
                    }
                </div>

                <div className={[classes.returnedData, classes.flex_item_9].join(' ')}>
                    <Switch>
                        <Route exact path="/home/genres/genre" render={props => <Genre {...props} />} />
                    </Switch>
                </div>
            </section>
        )
    }
};

export default Genres;