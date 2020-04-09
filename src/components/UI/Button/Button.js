import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Button.module.css';

const Button = (props) => {

    const [Hover, setHover] = useState(false)

    const toggleHover = () => {
        setHover(!Hover)
    }

    let linkStyle;
    let iconClass;
    let buttonClass;

    if (Hover) {
        linkStyle = {
            color: '#D9DCD9',
            cursor: 'pointer',
            backgroundColor: '#262626'
        }
    } else {
        linkStyle = { color: '#262626' }
    }

    switch (props.icon) {
        case "guitar": {
            iconClass = Hover ? classes.Button_guitar_hover : classes.Button_guitar;
            break;
        }
        case "note": {
            iconClass = Hover ? classes.Button_note_hover : classes.Button_note;
            break;
        }
        default: {
            iconClass = '';
        }
    }

    buttonClass = classes.Button;

    if ((window.location.pathname.search('/home/artists') !== -1)
        && (props.linkTo === '/home/artists')) {

        buttonClass = classes.Button_selected;

        linkStyle = {
            color: '#D9DCD9',
            cursor: 'pointer',
            backgroundColor: '#262626'
        }

        iconClass = classes.Button_guitar_hover;
    }
    else if ((window.location.pathname.search('/home/genres') !== -1)
        && (props.linkTo === '/home/genres')) {
        buttonClass = classes.Button_selected;

        linkStyle = {
            color: '#D9DCD9',
            cursor: 'pointer',
            backgroundColor: '#262626'
        }

        iconClass = classes.Button_note_hover;
    }

    return (
        <NavLink className={[props.styleClasses, buttonClass, iconClass].join(' ')}
            to={props.linkTo}
            onMouseOver={toggleHover}
            onMouseOut={toggleHover}
            style={linkStyle}>
            {props.title}
        </NavLink>
    )

};

export default Button;