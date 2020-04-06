import React from 'react';
import classes from '../UI/css/style.module.css';

const header = (props) => {    
    return (
        <header className={classes.header}>
            <section className={[classes.profile, classes.flex].join(' ')}>
                <div className={classes.logo}> SPOTIFY SONG KEYS </div>
                <div className={[classes.user].join(' ')}>
                    <div>{props.userName}</div>
                    <div>
                        <img className={classes.profileImg}
                            src={props.profileImgUrl} 
                            alt={"Profile"}/>
                    </div>
                </div>
            </section>
        </header>
    )

};

export default header;