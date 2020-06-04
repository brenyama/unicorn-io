import React, { Component } from 'react';
import styles from './index.css';
import { getProjects } from '../../api/projects';
import { Link } from 'react-router-dom';

import CreateProject from './CreateProject';
import ProjectTile from './ProjectTile';

import { createProject } from '../../api/projects';


export default class Projects extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      createProjectOpen: false,
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

  openCreateProject() {
    this.setState({
      createProjectOpen: true,
    })
  }

  closeCreateProject() {
    this.setState({
      createProjectOpen: false,
    })
  }

  createProject(title, description) {
    const { projects } = this.state;

    createProject({
      title,
      description
    }).then(response => {
      const updatedProjects = [ ...projects ]

      updatedProjects.push(response);

      this.setState({
        projects: updatedProjects
      })

      this.closeCreateProject();
    })
  }

  render() {
    const { projects, createProjectOpen } = this.state;

    const projectList = projects.map((project, i) => {
      return (
        <Link key={`project-${i}`} to={`/projects/${project._id}`}>
          <ProjectTile title={project.title} description={project.description} />
        </Link>
      )
    }).reverse();

    return (
      <div className={styles.container}>
        { createProjectOpen ?
          <CreateProject
            closeCreateProject={() => {this.closeCreateProject()}}
            createProject={(title, description) => {this.createProject(title, description)}}
          /> : null
        }
        <div className={styles.content}>
          <button className='btn-primary' onClick={() => {this.openCreateProject()}}>Create Project</button>
          <div id={styles.projectList}>
            {projectList}
          </div>
        </div>
      </div>
    )
  }
}

