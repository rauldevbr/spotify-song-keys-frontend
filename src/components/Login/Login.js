import React, { Component } from 'react';
import classes from './Login.module.css';
import girl_listening_music from '../../assets/girl.png';
import api from '../../services/api'

const port = process.env.PORT || 8888

class Login extends Component {
    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.Enter}>
                    <h1 className={classes.Title}>
                        <p>SPOTIFY</p>
                        <p>SONG KEYS</p>
                </h1>
                    <p className={classes.Text}>
                        Filter tracks from your<br />
                        favorite artists by<br />
                        key and speed.
                </p>
                    <button className={classes.Button}>
                        <a className={classes.Link} href={`${api}/login`}>ENTER</a>
                    </button>
                </div>
                <div className={classes.Girl}>
                    <img src={girl_listening_music} alt={"Girl listening music"}/>
                </div>
            </div>
        )
    }
};

export default Login;

