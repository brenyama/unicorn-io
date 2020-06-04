import React, { Component } from 'react';
import styles from './index.css';

export default class ProjectTile extends Component {
  render() {
    const { title, description, deleteProject } = this.props;

    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    )
  }
}