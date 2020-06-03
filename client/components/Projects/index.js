import React, { Component } from 'react';
import styles from './index.css';
import { getProjects } from '../../api/projects';
import { Link } from 'react-router-dom'

export default class Projects extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    }
  }

  componentDidMount() {
    // API call here
    this.setup();
  }

  setup() {
    getProjects().then(response => {
      this.setState({
        projects: response
      })
    });
  }

  render() {
    const { projects } = this.state;

    const projectList = projects.map((project, i) => {
      return (
        <Link key={`project-${i}`} to={`/projects/${project._id}`}>
          <div className={styles.project}>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
          </div>
        </Link>
      )
    });

    return (
      <div className={styles.container}>
        <h1>Project List</h1>
        <div id={styles.projectList}>
          {projectList}
        </div>
      </div>
    )
  }
}

