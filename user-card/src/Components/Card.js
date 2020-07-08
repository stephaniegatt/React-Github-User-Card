import React, { Component } from "react";

class Card extends Component {

    render() {
        return (
            <div>
                <h2>{this.props.user.name}</h2>
                <p>{this.props.user.login}</p>
                <p>{this.props.user.location}</p>
                <p>{this.props.user.followers}</p>
                <p>{this.props.user.following}</p>
                <p>{this.props.user.bio}</p>
            </div>
        )
    }
}

export default Card;