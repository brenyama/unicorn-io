import React, { Component } from 'react';
import styles from './index.css';

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    }
  }
  render() {
    const { closeCreateProject, createProject } = this.props;
    const { title, description } = this.state;

    return (
      <div className={styles.container} onClick={closeCreateProject}>
        <div className={styles.modal} onClick={(e) => {e.stopPropagation()}}>
          <h3>Create a Project</h3>
          <input className={styles.modalRow}  placeholder={'type title here...'} onChange={(e) => {this.setState({title: e.target.value})}} ></input>
          <textarea className={styles.modalRow}  placeholder={'type description here...'} onChange={(e) => {this.setState({description: e.target.value})}}></textarea>
          <div className={styles.modalRow}>
            <button className='btn-floater' onClick={closeCreateProject}>cancel</button>
            <button className='btn-floater' onClick={() => {createProject(title, description)}}>create</button>
          </div>
        </div>
      </div>
    )
  }
}