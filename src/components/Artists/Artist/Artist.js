import React, { Component } from 'react';
import classes from '../../UI/css/style.module.css';

class Artist extends Component {

    render() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            switch(param[0]) {
                case 'id': {
                    this.id = param[1]
                    break;
                }
                default: {
                    this.id = 0;
                }
            }
        }

        const artist = this.props.artists.find((artist, index) => {
            return artist.id === this.id;
        })        

        return (            
            <div className={classes.artist}>                
                <h1>{artist.name}</h1>
                <p><a href={artist.url} target="_blank" rel="noopener noreferrer">Link to Spotify</a></p>                
                <p><img className={classes.artistImage} 
                        src={artist.image}
                        alt={"artist"}/></p>
                <p>Followers: {artist.followers}</p>                        
            </div>
        )
    }
};

export default Artist;