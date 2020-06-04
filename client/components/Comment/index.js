import React, { Component } from 'react';
import styles from './index.css';

import ThreadFloater from './ThreadFloater';

export default class Comment extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { comment, commentIndex, openThread, closeAllThreads, resolveComment } = this.props;
    return (
      <div className={styles.comment} style={{
        'top': comment.position.y_loc + '%',
        'left': comment.position.x_loc + '%',
        'zIndex': comment.threadOpen ? '100' : '0'
      }} >
        {comment.threadOpen ? <div className={styles.dummyExitBG} onClick={closeAllThreads} /> : null}

        <div className={styles.bubble} onClick={openThread}>{commentIndex + 1}</div>

        {comment.threadOpen ? <ThreadFloater comment={comment} resolveComment={resolveComment} /> : null}
      </div>
    )
  }
}