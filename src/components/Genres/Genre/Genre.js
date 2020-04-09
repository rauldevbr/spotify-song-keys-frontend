import React, { useState } from 'react';

const Genre = (props) => {

    const [Id, setId] = useState()
    const [Name, setName] = useState()

    const query = new URLSearchParams(props.location.search);
    for (let param of query.entries()) {
        if (param[0] === 'id') {
            setId(param[1])
        } else if (param[0] === 'name') {
            setName(param[1])
        }
    }

    return (
        <React.Fragment>
            <h1>Genre id: {Id}</h1>
            <h1>Genre name: {Name}</h1>
        </React.Fragment>
    )
}

export default Genre;