import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/appEntry/LandingPage";
import "bootstrap/dist/css/bootstrap.css"; // To include React bootstrap's design.   https://react-bootstrap.github.io/getting-started/introduction/
import "font-awesome/css/font-awesome.css"; // To include font anwesome's design.     https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers
import firebase from "firebase";
import Main from "./components/Main/Main";
import "./App.css";


firebase.initializeApp({
  apiKey: "AIzaSyAv8KuODStE3ziKqsnviKZzLyPByaPZEPU",
  authDomain: "cmpe-281-drone.firebaseapp.com",
  databaseURL: "https://cmpe-281-drone.firebaseio.com",
  projectId: "cmpe-281-drone",
  storageBucket: "cmpe-281-drone.appspot.com",
  messagingSenderId: "385553130955",
  appId: "1:385553130955:web:98d10bb10d8cb17d72024e",
  measurementId: "G-K65XWBP3YC"
});


class App extends Component {
  render() {
    return (
      <main>
        <div className="content">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route  path="/main" component={Main} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
    );
  }
}

export default App;