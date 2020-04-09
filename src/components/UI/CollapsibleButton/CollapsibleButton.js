import React, { useState } from 'react';
import classes from './CollapsibleButton.module.css';
import generalClasses from '../../UI/css/style.module.css';
import { NavLink } from 'react-router-dom';
import collapse_arrow from '../../../assets/arrow.png';

const Collapsible = (props) => {

    const [Open, setOpen] = useState(false)

    const togglePanel = (e) => {
        setOpen(!Open)        
    }

    return (
        <div>
            <div className={generalClasses.sidenav_button}>
                <div className={classes.link_container}>
                    <NavLink
                        key={props.link_key}
                        to={props.link_to}
                        className={classes.link}>
                        {props.title}
                    </NavLink>
                </div>
                <div className={classes.icon}>
                    <img src={collapse_arrow}
                        className={classes.arrow_icon}
                        onClick={(e) => togglePanel(e)}
                        alt={"Arrow icon"} />
                </div>
            </div>

            {
                Open ? (
                    <div className={classes.content}>
                        {props.children}
                    </div>
                ) : null
            }
        </div >
    );
}

export default Collapsible;