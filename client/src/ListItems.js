import axios from 'axios';
import React from 'react';

export class ListItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount = () => {
        this.refreshItems();
    }

    refreshItems = () => {
        axios.get('https://bootcampappapi.brainstorm3d.com/posts/').then((response) => {
            console.log(response.data.data);
            this.setState({
                items: response.data.data
            });
        });
    }

    getRandom = () => {
        return Math.round(1 + Math.random() * 99);
    }

    handleAddClick = () => {
        axios.post('https://bootcampappapi.brainstorm3d.com/posts/', {
            "author": this.getRandom(),
            "body": this.getRandom(),
            "title": this.getRandom(),
        }).then(() => {
            console.log("add");
            this.refreshItems();
        });
    }

    handleRemoveClick = (id) => {
        axios.delete('https://bootcampappapi.brainstorm3d.com/posts/' + id).then(() => {
            console.log("delete");
            this.refreshItems();
        });
    }

    render = () => {
        return (
            <>
                <button onClick={this.handleAddClick}>Add element</button>
                {this.state.items.map((row) =>
                    <span key={row._id}>{row.title} <button onClick={() => this.handleRemoveClick(row._id)}>Remove</button></span>
                )}
            </>
        );
    }
}
