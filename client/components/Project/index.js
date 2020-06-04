import React, { Component } from 'react'
import styles from './index.css'
import { getBoards, deleteBoard } from '../../api/boards';
import {
  Link,
  useParams
} from 'react-router-dom';
import { createBoard } from '../../api/boards'
import { getProject } from '../../api/projects'

import CreateBoard from './CreateBoard'
import BoardTile from './BoardTile'

export default class Project extends Component {

  constructor(props){
    super(props);

    this.state = {
      boards: [],
      project: {},
      createBoardOpen: false,
    }
  }

  componentDidMount() {
    this.setup()
  }
  
  setup() {
    const { match: { params } } = this.props;

    getBoards(params.pid).then((response) => {
      this.setState({
        boards: response,
      });
    });

    getProject(params.pid).then((response) => {
      this.setState({
        project: response,
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
      const updatedBoards = [ ...boards ]

      updatedBoards.push(response);

      this.setState({
        boards: updatedBoards
      })

      this.closeCreateBoard();
    })
  }

  deleteBoard (pid, bid) {
    const { boards } = this.state;

    deleteBoard(pid, bid)
      .then(response => {
        let updatedBoard = [ ...boards ];

        updatedBoard = updatedBoard.filter((board) => board._id !== response._id)

        this.setState({
          boards: updatedBoard
        })
      })
  }

  render() {

    const { boards, createBoardOpen, project } = this.state;
    const { match: { params } } = this.props;
    const { description, title } = project;

    const boardsList = boards.map((board, i) => {
      return (
        <Link to={`/projects/${params.pid}/boards/${board._id}`}>
          <BoardTile key={`boardtile-${i}`} deleteBoard={(pid, bid) => {this.deleteBoard(pid, bid)}} bid={board._id} pid={params.pid} title={board.title} description={board.description} image_url={board.image_url} />
        </Link>
      )
    }).reverse();

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.title}>{title ? title : null}</p>
          <p className={styles.description}>{description ? description : null}</p>
          <div className={styles.breakLine}></div>
        </div>
        {createBoardOpen ? <CreateBoard closeCreateBoard={() => {this.closeCreateBoard()}} createBoard={(title, description, image_url) => { this.createBoard(title, description, image_url) }} /> : null}
        <button className={'btn-primary'} onClick={() => {this.openCreateBoard()}}>Create design board</button>
        <div className={styles.boardList}>
          {boards.length === 0 ? <div className={styles.empty}>you haven't created any boards here.</div> : null}
          {boardsList}
        </div>
      </div>
    )
  }
}