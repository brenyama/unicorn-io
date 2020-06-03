import React, { Component } from 'react'
import styles from './index.css'
import { getBoards } from '../../api/boards';
import {
  Link,
  useParams
} from "react-router-dom";

export default class Project extends Component {

  constructor(props){
    super(props);

    this.state = {
      boards: [],
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

  render() {

    const { boards } = this.state;
    const { match: { params } } = this.props;

    const boardsList = boards.map((board, i) => {
      return (
        <Link to={`/projects/${params.pid}/boards/${board._id}`}>
          <div key={`board-${i}`} className={styles.board}>{board.title}</div>
        </Link>
      )
    })

    return (
      <div className={styles.container}>
        {boardsList}
      </div>
    )
  }
}