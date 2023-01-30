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
        axios.get('https://bootcampapp.brainstorm3d.com:8081/posts/').then((response) => {
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
        axios.post('https://bootcampapp.brainstorm3d.com:8081/posts/', {
            "author": this.getRandom(),
            "body": this.getRandom(),
            "title": this.getRandom(),
        }).then(() => {
            console.log("add");
            this.refreshItems();
        });
    }

    handleRemoveClick = (id) => {
        axios.delete('https://bootcampapp.brainstorm3d.com:8081/posts/' + id).then(() => {
            console.log("delete");
            this.refreshItems();
        });
    }

    render = () => {
        return (
            <>
                <button onClick={this.handleAddClick}>Add</button>
                {this.state.items.map((row) =>
                    <span key={row._id}>{row.title} <button onClick={() => this.handleRemoveClick(row._id)}>Remove</button></span>
                )}
            </>
        );
    }
}
