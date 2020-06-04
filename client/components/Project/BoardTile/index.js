import React, { Component } from 'react';
import styles from './index.css';

export default class BoardTile extends Component {

  render() {
    const { title, description, image_url, deleteBoard, pid, bid } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.wrapper} style={{
            'background': `url(${image_url})`,
            'backgroundSize' : 'cover',
            'backgroundPosition': 'center center'
          }}>
          <div className={styles.tileFooter}>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
            <button className={styles.delete}>delete</button>
          </div>
        </div>
        <div className={styles.tileFooter}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
          <button className={styles.delete + ' btn-floater'} onClick={(e) => {e.preventDefault(); e.stopPropagation(); deleteBoard(pid, bid)}}>delete</button>
        </div>
      </div>
    )
  }
}