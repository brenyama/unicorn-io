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
          <div className={styles.nav}>
            <Link to={'/'}>
              <div className={styles.logo}>
                <img src="https://rhmo0w.bl.files.1drv.com/y4peO3ZLbozjCX0YKinhxYUa52PBmGb49-lxTShc5Pi39kD4AWRe1c3SeyFKjhMNxS-Gfr-nGSVelAFqLZrXUMZoXutTmth2hUhpzumoW2PDOXYUN4keAVcWN2Gvp0dDRg0s49bMQjSB90wSZ4urQatu4hFnWTB7HjnTKRmZf6C7jlGNnD7nvxZ6zlg-wH-Hf47-bf3qfpNZOFVaMOrh2gMBQ/unicorn-face_1f984.png?psid=1"/>
              </div>
            </Link>
          </div>
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