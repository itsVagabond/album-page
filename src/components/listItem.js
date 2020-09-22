import React, { Component } from "react";

export default class ListItem extends Component {
    render() {
        const { item } = this.props;
        return (
            <div key={item.id} className="listItem">
                <span className="albumTitle">ALBUM TITLE: {item.title}</span>
                <span className="user">User: {item.name}</span>
            </div>
        );
    }
}