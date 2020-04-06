import React, {Component} from 'react';

class Layout extends Component {

    //state = {
    //    value1 = 0,
    //    value2 = 'empty'
    //}

    render() {
        return (
            <React.Fragment>
                {/* <Toolbar /> */}
                <main /* className={classes.Content} */>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
};

export default Layout;