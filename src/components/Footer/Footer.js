import React from 'react';
import classes from '../UI/css/style.module.css';

const footer = (props) => {
    return (
        <div className={classes.footer_background}>
            <footer className={[classes.footer, classes.flex].join(' ')}>
                <p>Developed by Raul Gomes</p>
                <p className={classes.contact}>Contact</p>
            </footer>
        </div>
    )

};

export default footer;