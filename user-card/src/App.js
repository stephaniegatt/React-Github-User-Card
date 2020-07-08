import React, { Component } from "react";
import axios from "axios";
import Card from "./Components/Card";
import './App.css';
import CardList from "./Components/CardList";


class App extends Component {
  state = {
    user: {},
    followers: []
  }

  componentDidMount() {
    axios.get("https://api.github.com/users/stephaniegatt").then(userRes => {
      // console.log("data", userRes.data);
      axios.get(userRes.data.followers_url).then(followersRes => {
        // console.log("followers data", followersRes.data);
        // Is async best practice? Works without it
        const promises = followersRes.data.map(async follower => {
          return axios.get(follower.url).then(res => res.data);
        })
        Promise.all(promises).then(data => {
          this.setState({
            ...this.state,
            user: userRes.data,
            followers: data,
          });
        })
      });
    });
  }

  componentDidUpdate() {
    
  }

  
  render() {
    return (
      <div className="container">
        <h1>GitHub User Cards</h1>
        <Card user={this.state.user} />
        <CardList followers={this.state.followers} />
      </div>
    )
  }
}

export default App;
