import React, { Component } from 'react';
import styles from './index.css';

export default class ThreadFloater extends Component {
  render() {
    const { comment, closeAllThreads } = this.props;
    return (
      <div className={styles.container}>
        {comment.text}
      </div>
    )
  }
}