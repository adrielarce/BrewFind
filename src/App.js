import "./App.css";
import React, { Component } from "react";
import SearchBreweries from "./components/Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div className="content">
          <SearchBreweries />
        </div>
      </div>
    );
  }
}

export default App;
