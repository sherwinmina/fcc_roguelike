import React, { Component } from 'react'
import '../styles/Layout.scss';
import Score from './Score';
import MainBoard from './MainBoard';


class Layout extends Component {
  render () {
    return (
      <div>
      <div className='header'>Dungeon Crawlers</div>

      <div className='container'>
        <div className='game-area'>
          <MainBoard/>
        </div>

        <div className='score'>
          <Score/>
        </div>
      </div>
      </div>
    )
  }
}

export default Layout