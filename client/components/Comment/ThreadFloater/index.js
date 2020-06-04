import React, { Component } from 'react';
import styles from './index.css';

export default class ThreadFloater extends Component {

  render() {
    const { comment, resolveComment } = this.props;
    return (
      <div className={styles.container}>
        <p>{comment.text}</p>
        <button className={'btn-floater'} onClick={resolveComment}>resolve</button>
      </div>
    )
  }
}