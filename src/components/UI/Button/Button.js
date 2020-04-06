import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Button.module.css';

class Button extends Component {

    state = {
        hover: false
    }

    toggleHover = () => {
        this.setState({ hover: !this.state.hover });
    }

    render() {
        let linkStyle;
        let iconClass;
        let buttonClass;

        if (this.state.hover) {
            linkStyle = { color: '#D9DCD9', 
                          cursor: 'pointer', 
                          backgroundColor: '#262626' }
        } else {
            linkStyle = { color: '#262626' }
        }

        switch(this.props.icon) {
            case "guitar": {
                iconClass = this.state.hover ? classes.Button_guitar_hover : classes.Button_guitar;
                break;
            }
            case "note": {
                iconClass = this.state.hover ? classes.Button_note_hover : classes.Button_note;
                break;
            }
            default: {
                iconClass = '';
            }
        }

        buttonClass = classes.Button;



        if((window.location.pathname.search('/home/artists') !== -1)
            && (this.props.linkTo === '/home/artists')) {

                buttonClass = classes.Button_selected;

                linkStyle = { color: '#D9DCD9', 
                cursor: 'pointer', 
                backgroundColor: '#262626' }

                iconClass = classes.Button_guitar_hover;             
        } 
        else if((window.location.pathname.search('/home/genres') !== -1) 
            && (this.props.linkTo === '/home/genres')) {
                buttonClass = classes.Button_selected;

                linkStyle = { color: '#D9DCD9', 
                cursor: 'pointer', 
                backgroundColor: '#262626' }

                iconClass = classes.Button_note_hover;
        }

        return (
            <NavLink className={[this.props.styleClasses, buttonClass, iconClass].join(' ')}
                to={this.props.linkTo}                
                onMouseOver={this.toggleHover}
                onMouseOut={this.toggleHover}                
                style={linkStyle}>
                {this.props.title}
            </NavLink>
        )
    }
};

export default Button;