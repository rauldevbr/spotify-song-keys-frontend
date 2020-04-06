import React, { Component } from 'react';
import classes from '../UI/css/style.module.css';
import Button from '../UI/Button/Button';

class Navigation extends Component {
    
    render() {
        return (
            <div className={classes.navigation}>
                <nav className={[classes.nav_bar, classes.flex].join(' ')}>
                    <ul>
                        <li>
                            <Button styleClasses={classes.navLink}
                                    title={"ARTISTS"}
                                    linkTo={"/home/artists"}
                                    icon={"guitar"} />
                        </li>
                        <li>
                        <Button styleClasses={classes.navLink}
                                    title={"GENRES"}
                                    linkTo={"/home/genres"} 
                                    icon={"note"} />
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
};

export default Navigation;