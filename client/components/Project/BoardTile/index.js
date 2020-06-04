import React, { Component } from 'react';
import styles from './index.css';

export default class BoardTile extends Component {

  render() {
    const { title, description, image_url } = this.props

    return (
      <div class={styles.container}>
        <div class={styles.wrapper} style={{
            'background': `url(${image_url})`,
            'backgroundSize' : 'cover',
            'backgroundPosition': 'center center'
          }}>
          <div class={styles.tileFooter}>
            <p class={styles.title}>{title}</p>
            <p class={styles.description}>{description}</p>
          </div>
        </div>
      </div>
    )
  }
}