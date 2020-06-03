import React, { Component } from 'react';
import styles from './index.css';
import { getBoard } from '../../api/boards';
import Comment from '../Comment';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: null,
      comments: [],
    }
  }

  componentDidMount() {
    // API call here to grab board
    const { pid, bid } = this.props.match.params
    getBoard(pid, bid).then(response => {

      this.setState({
        board: response,
        comments: response.comments.map(comment => {
          return {...comment, threadOpen: false}
        }),
      })
    })
  }

  closeAllThreads() {
    console.log('hello')
    const { comments } = this.state;
    const updatedComments = [...comments];

    updatedComments.forEach(comment => {
      comment.threadOpen = false;
    })

    this.setState({
      comments: updatedComments,
    })

  }

  openThread(commentIndex) {
    console.log('no')
    const { comments } = this.state;
    const updatedComments = [...comments];
    updatedComments[commentIndex].threadOpen = true;

    this.setState({
      comments: updatedComments,
    })
  }

  render() {

    const { board, comments } = this.state;
    console.log(comments)
    let commentList = null;
    if (board) {
      commentList = comments.map((comment, i) => {
        return <Comment key={`comment-${i}`} comment={comment} commentIndex={i} openThread={() => {this.openThread(i)}} closeAllThreads={() => {this.closeAllThreads()}} />
      })
    }

    return(
      <div className={styles.container} >
        <div className={styles.boardImg}>
          {commentList}
          {board && board.image_url ? <img src={board.image_url} /> : null}
        </div>
      </div>
    )
  }
}