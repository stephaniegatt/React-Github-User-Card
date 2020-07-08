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
    // initial axios request for main user card data
    axios.get("https://api.github.com/users/stephaniegatt").then(userRes => {
      // console.log("data", userRes.data);
      // once data is aquired, then axios request for followers using the followers url from initial data
      axios.get(userRes.data.followers_url).then(followersRes => {
        // console.log("followers data", followersRes.data);
        // Is async best practice? Works without it
        // set variable of promises to map over followers array and return axios promises for each followers data
        // https://stackoverflow.com/questions/56319625/individual-axios-call-for-each-item-in-array
        const promises = followersRes.data.map(async follower => {
          return axios.get(follower.url).then(res => res.data);
        })
        // once all promises are fulfilled then state of user and followers are set
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
