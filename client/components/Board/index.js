import React, { Component } from 'react';
import styles from './index.css';
import { getBoard } from '../../api/boards';
import Comment from '../Comment';
import { createComment, updateComment } from '../../api/comments';
import CreateFloater from '../Comment/CreateFloater';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: null,
      comments: [],
      createComment: null,
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
    const { comments } = this.state;
    const updatedComments = [...comments];
    updatedComments[commentIndex].threadOpen = true;

    this.setState({
      comments: updatedComments,
    })
  }

  openCreateComment(e) {

    const x_rel = e.pageX - e.target.getBoundingClientRect().x - window.scrollX;
    const y_rel = e.pageY - e.target.getBoundingClientRect().y - window.scrollY;

    const target_height = e.target.getBoundingClientRect().bottom - e.target.getBoundingClientRect().top;
    const target_width = e.target.getBoundingClientRect().right - e.target.getBoundingClientRect().left;

    console.log(target_width, target_height)

    this.setState({
      createComment: {
        x_loc: x_rel/target_width * 100,
        y_loc: y_rel/target_height * 100,
      }
    })
  }

  createComment(text, x_loc, y_loc) {
    const { pid, bid } = this.props.match.params;
    const { comments } = this.state;

    createComment(pid, bid, {
      "text": text,
      "position": {
        "x_loc": x_loc,
        "y_loc": y_loc
      }
    })
      .then((response) => {
        const updatedComments = [...comments];
        updatedComments.push(response)

        this.setState({
          comments: updatedComments,
        })

        this.closeCreateFloater();
      })
  }

  closeCreateFloater() {
    this.setState({
      createComment: null,
    })
  }

  resolveComment(pid, bid, cid, commentIndex) {
    const { comments } = this.state;

    updateComment(pid, bid, cid, {
      resolved: true
    }).then(response => {
      const updatedComments = [...comments];
      updatedComments[commentIndex].resolved = true;

      this.setState({
        comments: updatedComments,
      })

      this.closeAllThreads;
    })
  }

  render() {
    const { pid, bid } = this.props.match.params;
    const { board, comments, createComment } = this.state;
    let commentList = null;
    if (board) {
      commentList = comments.map((comment, i) => {
        if (comment.resolved) return null;
        return <Comment 
          key={`comment-${i}`}
          comment={comment}
          commentIndex={i}
          openThread={(e) => {e.stopPropagation(); this.openThread(i)}}
          closeAllThreads={(e) => {e.stopPropagation(); this.closeAllThreads()}}
          resolveComment={(e) => {e.stopPropagation(); this.resolveComment(pid, bid, comment._id, i)}}
        />
      })
    }

    return(
      <div className={styles.container} >
        <div className={styles.info}>
          <div className={styles.title}>{board ? board.title : null}</div>
          <div className={styles.description}>{board ? board.description : null}</div>
        </div>
        <div className={styles.board}>
          <div className={styles.boardImg} onClick={(e) => {this.openCreateComment(e)}}>
            {commentList}
            {createComment ?
              <CreateFloater
                x_loc={createComment.x_loc}
                y_loc={createComment.y_loc}
                closeCreateFloater={(e) => {e.stopPropagation(); this.closeCreateFloater()}}
                createComment={(text, x, y) => this.createComment(text, x, y)}
              /> : null}
            {board && board.image_url ? <img src={board.image_url} /> : null}
          </div>
        </div>
      </div>
    )
  }
}