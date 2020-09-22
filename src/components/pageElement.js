import React, { Component } from "react";

export default class PageElement extends Component {
    render() {
        const { page, flag } = this.props;
        return (
            <span className={flag ? "currentPage" : "regularPage" } key={page}>
                {page}
            </span>
        );
    }
}

