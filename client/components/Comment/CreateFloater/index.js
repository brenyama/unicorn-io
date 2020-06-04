import React, { Component } from 'react';
import styles from './index.css';

export default class CreateFloater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }

  render() {
    const {x_loc, y_loc, createComment, closeCreateFloater} = this.props;
    const { text } = this.state;

    return (
      <div className={styles.container} style={{
        "top": y_loc + '%',
        "left": x_loc + '%'
      }}>
        <div className={styles.floater}>
          <h5>Post a comment</h5>
          <div className={styles.inputRow}>
            <textarea
              placeholder="type something here..."
              onClick={(e) => {e.stopPropagation()}}
              onChange={(e) => {
                this.setState({
                  text: e.target.value
                })
            }}/>
            <button className='btn-floater' id={styles.postButton} onClick={(e) => {e.stopPropagation(); createComment(text, x_loc, y_loc)}}>post</button>
          </div>
        </div>
        <div className={styles.dummyExit} onClick={closeCreateFloater} />
      </div>
    )
  }
}