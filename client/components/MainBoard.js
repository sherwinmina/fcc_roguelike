import React, { Component } from 'react';
import Wall from './Wall.js';
import OpenTile from './OpenTile.js';
import Player from './Player.js';
import Exit from './Exit.js';
import '../styles/MainBoard.scss';

class MainBoard extends Component {
  constructor(props){
    super(props)
    // This binding is necessary to make `this` work in the callback which will allow us to set state
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // Actors data will contain data for all objects that exist on board and their locations... then when drawing board use that as a switch to draw their corresponding component
    this.state = {
      board: this.createBoard(),
      actors: {}
    }
  }

  createBoard() {
    var boardSize = 40;
    var board = [];
    // Populate board
    for( var i = 0; i < boardSize; i++ ){
      if(board[i] === undefined){
        board[i] = [];
      }
      for( var j = 0; j < boardSize; j++ ){
        board[i][j] = 'wall'; 
      }
    }
    // TODO remove boardsize from all these calls and chains... its just noise atm
    this.buildRooms(board, boardSize);
    this.setRandomOpenTile(board, boardSize, 'player' );
    this.setRandomOpenTile(board, boardSize, 'exit' );
    return board;
  }
 
  // Generates a square room within the board coordinates
  // TODO Do not build rooms that flow out of bounds
  // TODO Connect rooms
  // TODO Improve readability
  buildRooms(board, boardSize){
    var minSize = 5;
    var maxSize = 10;
    var roomSize = this.getRandomIntBetweenMinMax( minSize, maxSize );
    var roomStartingLocationX = this.getRandomIntBetweenMinMax( 0, boardSize);
    var roomStartingLocationY = this.getRandomIntBetweenMinMax( 0, boardSize);
    console.log( "Building a room of size: " + roomSize );
    console.log( "Build starting at " + roomStartingLocationX + ' ' + roomStartingLocationY )

    for ( var x = roomStartingLocationX; x < roomStartingLocationX + roomSize; x++ ) {
      for ( var y = roomStartingLocationY; y < roomStartingLocationY + roomSize; y++ ) {
        // Do nothing if tile is out of bounds
        if( board[x] === undefined || board[x][y] === undefined ) {
          continue;
        }
        board[x][y] = 'openTile';
        console.log( 'creating open tile at ' + x + ',' + y );
      }
    }
  }

  // Changes a random open tile to the given tileType
  setRandomOpenTile( board, boardSize, tileType ){
    console.log( 'Setting ' + tileType );
    var openRoom = this.getRandomOpenTile( board, boardSize );
    board[openRoom.y][openRoom.x] = tileType;
  }

  componentDidMount(){

    document.addEventListener( "keydown", this.handleKeyPress );
  }

  componentWillUnmount(){
    document.removeEventListener( "keydown", this.handleKeyPress )
  }

  handleKeyPress(e){
    // TODO confirm if nativeEvent the react way to do this?
    // console.log( e )
    //this.movePlayer(e.key); 
    var key = e.key;
    console.log( key + ' key is pressed' )

    // TODO check if next tile is open
    var currentPlayerPosition = { 'x': 0, 'y': 0 };
    switch(key){
      case 'ArrowUp':
      case 'w':
        currentPlayerPosition.y--;
        break;
      case 'ArrowLeft':
      case 'a':
        currentPlayerPosition.x--;
        break;
      case 'ArrowDown':
      case 's':
        currentPlayerPosition.y++;
        break;
      case 'ArrowRight':
      case 'd':
        currentPlayerPosition.x++;
        break;
    }

    var board = this.state.board;
    board[ currentPlayerPosition.x][currentPlayerPosition.y] = 'player';
    this.setState({ board: board })
  }
  
  getRandomOpenTile( board, boardSize ){
    var randomX = Math.floor( ( Math.random() * boardSize ) );
    var randomY = Math.floor( ( Math.random() * boardSize ) );
    
    if( board[randomY][randomX] !== undefined && board[randomY][randomX] === 'openTile' ){
      //console.log( 'randomOpenRoom found at: ' + randomX + ',' + randomY );
      return { 'x': randomX, 'y': randomY  }
    } else {
      return this.getRandomOpenTile( board, boardSize );
    }
  }

  // TODO helper function not needed here... abstract out
  getRandomIntBetweenMinMax( min, max ) {
    return Math.round( Math.random() * (max - min) + min );
  }
 
  drawTiles(){
    var rows = [];
    for (var row = 0; row < this.state.board.length; row++) {
      var components = [];
      for (var column = 0; column < this.state.board[row].length; column++) {
        var component;
        // TODO make switches into constants
        switch( this.state.board[row][column] ){
          case 'player':
            component = <Player />
            break;
          case 'exit':
            component = <Exit />
            break;
          case 'openTile':
            component = <OpenTile />
            break;
          case 'wall':
          default:
            component = <Wall />
        }
        components.push( component );
      }
      // This line is the reason for the current implementation, so we can wrap components in row divs
      rows.push( <div className='row'>{components}</div> );
    }
    return rows;
  }
  
 // TODO content editable is used to allow keypress on a div but react gives a warning about managing child components... unsure of hazard and fix
  render() {
    return (
      <div>
        {this.drawTiles()}
      </div>
    );
  }
}

export default MainBoard;
