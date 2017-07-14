import React, { Component } from 'react';
import '../styles/tiles.scss';

class OpenTile extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return <div className='tile openTile'></div>
  }
}

export default OpenTile;