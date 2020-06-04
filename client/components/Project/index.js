import React, { Component } from 'react'
import styles from './index.css'
import { getBoards } from '../../api/boards';
import {
  Link,
  useParams
} from 'react-router-dom';
import { createBoard } from '../../api/boards'

import CreateBoard from './CreateBoard'
import BoardTile from './BoardTile'

export default class Project extends Component {

  constructor(props){
    super(props);

    this.state = {
      boards: [],
      createBoardOpen: false,
    }
  }

  componentDidMount() {
    this.setup()
  }
  
  setup() {
    const { match: { params } } = this.props;
    const boards = getBoards(params.pid).then((response) => {
      this.setState({
        boards: response,
      });
    });
  }

  openCreateBoard() {
    this.setState({
      createBoardOpen: true,
    })
  }

  closeCreateBoard() {
    this.setState({
      createBoardOpen: false,
    })
  }

  createBoard(title, description, image_url) {
    const { boards } = this.state;
    const { match: { params } } = this.props;
    
    createBoard(params.pid, {
      title,
      description,
      image_url,
    }).then(response => {
      console.log(response)
      const updatedBoards = [ ...boards ]

      updatedBoards.push(response);

      this.setState({
        boards: updatedBoards
      })

      this.closeCreateBoard();
    })
  }

  render() {

    const { boards, createBoardOpen } = this.state;
    const { match: { params } } = this.props;

    const boardsList = boards.map((board, i) => {
      return (
        <Link to={`/projects/${params.pid}/boards/${board._id}`}>
          <BoardTile key={`boardtile-${i}`} title={board.title} description={board.description} image_url={board.image_url} />
        </Link>
      )
    }).reverse();

    return (
      <div className={styles.container}>
        {createBoardOpen ? <CreateBoard closeCreateBoard={() => {this.closeCreateBoard()}} createBoard={(title, description, image_url) => { this.createBoard(title, description, image_url) }} /> : null}
        <button className={'btn-primary'} onClick={() => {this.openCreateBoard()}}>create board</button>
        <div className={styles.boardList}>
          {boardsList}
        </div>
      </div>
    )
  }
}