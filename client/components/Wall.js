import React, { Component } from 'react';
import '../styles/tiles.scss';

class Wall extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return <div className='tile wall'></div>
  }
}

export default Wall;