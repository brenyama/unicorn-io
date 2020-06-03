import React, { Component } from 'react';
import styles from './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createBrowserHistory } from "history";

import Projects from '../components/Projects'
import Project from '../components/Project'
import Board from '../components/Board'

const customHistory = createBrowserHistory();


export default class App extends Component {
  render() {
    return (
      <Router history={customHistory}>
        <div className={styles.container}>
          <Link to={'/'}><h4>Projects</h4></Link>
          <Switch>
            <Route exact path="/" component={Projects} />
            <Route exact path="/projects/:pid" component={Project} />
            <Route exact path="/projects/:pid/boards/:bid" component={Board} />
          </Switch>
        </div>
      </Router>
    );
  }
}