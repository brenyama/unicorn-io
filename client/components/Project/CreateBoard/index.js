import React, { Component } from 'react';
import styles from './index.css';

export default class CreateBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image_url: '',
    }
  }
  render() {
    const { closeCreateBoard, createBoard } = this.props;
    const { title, description, image_url} = this.state;

    return (
      <div className={styles.container} onClick={closeCreateBoard}>
        <div className={styles.modal} onClick={(e) => {e.stopPropagation()}}>
          <h3>Create a Board</h3>
          <input className={styles.modalRow}  placeholder={'type title here...'} onChange={(e) => {this.setState({title: e.target.value})}} ></input>
          <textarea className={styles.modalRow}  placeholder={'type description here...'} onChange={(e) => {this.setState({description: e.target.value})}}></textarea>
          <input className={styles.modalRow}  placeholder={'paste image url here...'} onChange={(e) => {this.setState({image_url: e.target.value})}} ></input>
          <div className={styles.modalRow}>
            <button className='btn-floater' onClick={closeCreateBoard}>cancel</button>
            <button className='btn-floater' onClick={() => {createBoard(title, description, image_url)}}>create</button>
          </div>
        </div>
      </div>
    )
  }
}