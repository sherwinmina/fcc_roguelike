import React, { Component } from 'react';
import '../styles/tiles.scss';

class Player extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return <div className='tile player'></div>
  }
}

export default Player;