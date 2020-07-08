import React, { Component } from "react";
import Card from "./Card";

class CardList extends Component {
    render() {
        return (
            <div>
                {this.props.followers.map(follower => {
                    return (
                        <div key={follower.id}> 
                           <Card user={follower} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default CardList;