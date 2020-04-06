import React, { Component } from 'react';
import classes from './CollapsibleButton.module.css';
import generalClasses from '../../UI/css/style.module.css';
import { NavLink } from 'react-router-dom';
import collapse_arrow from '../../../assets/arrow.png';


class Collapsible extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e) {
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <div>
                <div className={generalClasses.sidenav_button}>
                    <div className={classes.link_container}>
                        <NavLink
                            key={this.props.link_key}
                            to={this.props.link_to}
                            className={classes.link}>
                            {this.props.title}
                        </NavLink>
                    </div>
                    <div className={classes.icon}>
                        <img src={collapse_arrow} 
                             className={classes.arrow_icon} 
                            onClick={(e) => this.togglePanel(e)} 
                            alt={"Arrow icon"}/>
                    </div>
                </div>

                {
                    this.state.open ? (
                        <div className={classes.content}>
                            {this.props.children}
                        </div>
                    ) : null
                }
            </div >
        );
    }
}

export default Collapsible;