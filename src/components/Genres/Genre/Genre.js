import React, { Component } from 'react';

class Artist extends Component {

    render() {        
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            if (param[0] === 'id') {
                this.id = param[1];
            } else if(param[0] === 'name') {
                this.name = param[1];
            }
        }

        return (
            <React.Fragment>
                <h1>Genre id: {this.id}</h1>
                <h1>Genre name: {this.name}</h1>
            </React.Fragment>
        )
    }
};

export default Artist;