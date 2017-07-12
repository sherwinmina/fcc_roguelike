import React, { Component } from 'react';
import '../styles/App.css';

class MainBoard extends Component {
  constructor(props){
    super(props)

    // Generates a board with all walls
    var boardSize = 60;
    var boardCoordinates = [];
    for( var i = 0; i < boardSize; i++ ){
      if(boardCoordinates[i] === undefined){
        boardCoordinates[i] = [];
      }
      for( var j = 0; j < boardSize; j++ ){
        boardCoordinates[i][j] = { 'isWall' : true };
      }
    }
 
    // This binding is necessary to make `this` work in the callback which will allow us to access state
    this.handleKeyPress = this.handleKeyPress.bind(this);

    //TODO Keep list of open tiles for faster access?
    this.state = {
      boardSize: boardSize,
      board: boardCoordinates,
      player: undefined
    }
  }

  // Generates a square room within the board coordinates
  // TODO Do not build rooms that flow out of bounds
  // TODO Connect rooms
  // TODO Improve readability
  buildRooms(){
    var roomSize = this.getRandomIntBetweenMinMax( 5, 10 );
    var roomStartingLocationX = this.getRandomIntBetweenMinMax( 0, this.state.boardSize );
    var roomStartingLocationY = this.getRandomIntBetweenMinMax( 0, this.state.boardSize );
    console.log( "Building a room of size: " + roomSize );
    console.log( "Build starting at " + roomStartingLocationX + ' ' + roomStartingLocationY )
    for ( var x = roomStartingLocationX; x < roomStartingLocationX + roomSize; x++ ) {
      for ( var y = roomStartingLocationY; y < roomStartingLocationY + roomSize; y++ ) {
        if( this.state.board[x] === undefined || this.state.board[x][y] === undefined ) {
          continue;
        }
        //this.setState({board: [...this.state.board.isWall, false] });
        this.state.board[x][y].isWall = false;
      }
    }
  }
  
  // Initialize the level
  componentDidMount(){
    this.buildRooms();
    this.startPlayer();
  }
 
  // Adds the initial player data
  startPlayer(){
    console.log( 'Starting Player' );
    var openRoom = this.getRandomOpenRoom();
    this.setState({
      player: {
        hp: 10,
        x: openRoom.x, 
        y: openRoom.y 
      }
    })
  }

  handleKeyPress(e){
    // TODO confirm if nativeEvent the react way to do this?
    //console.log( e.nativeEvent.key )
    //console.log( e )
    //console.log( this )
    this.movePlayer(e.nativeEvent.key);
  }
  
  // Handle move keys
  movePlayer( direction ){
    console.log( direction + ' key is pressed' )

    // TODO check if next tile is open

    var currentPlayerPosition = { 'x': this.state.player.x, 'y': this.state.player.y };
    switch(direction){
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
    this.setState({ player: {
      x: currentPlayerPosition.x,
      y: currentPlayerPosition.y
    }})
  }
  
  // Returns coordinates of a random tile that is not a wall
  getRandomOpenRoom(){
    var randomX = Math.floor( ( Math.random() * this.state.boardSize ) );
    var randomY = Math.floor( ( Math.random() * this.state.boardSize ) );
    var board = this.state.board;
    if( board[randomY][randomX] !== undefined && board[randomY][randomX].isWall === false ){
      //console.log( 'randomOpenRoom found at: ' + randomX + ',' + randomY );
      return { 'x': randomX, 'y': randomY  }
    } else {
      return this.getRandomOpenRoom();
    }
  }

  getRandomIntBetweenMinMax( min, max ) {
    return Math.floor( Math.random() * (max - min) + min );
  }

 
  drawBoard(){
    // Don't draw if player hasn't initialized
    if( this.state.player === undefined ){
      return;
    }
    console.log('drawingBoard');
    var row = [];
    var fullBoard = [];
    for (var y = 0; y < this.state.board.length; y++) {
      row = [];
      for (var x = 0; x < this.state.board.length; x++) {
        var tile;
        if( this.state.board[y][x].isWall === true ){
          tile = 'blocked';
        } else {
          tile = 'open';
        }

        // TODO remove this and add a single call, possibly by using another layer with corrdinates or injecting to id/ref?
        var hasPlayer = '';
        if( this.state.player !== undefined && this.state.player.y === y && this.state.player.x === x ){
          console.log( 'found player at ' + y + ',' + x );
          hasPlayer = ' hasPlayer';
        }

        row.push( <div id={y + "," + x} className={tile + hasPlayer} ></div> ); 
      }
      fullBoard.push(<div className="row">{row}</div> );
    }
    return <div>{fullBoard}</div>
  }

 // TODO content editable is used to allow keypress on a div but react gives a warning about managing child components... unsure of hazard and fix
  render() {
    return (
      <div className="App" contentEditable={true} onKeyDown={this.handleKeyPress}>
        <h2>FreeCodeCamp Roguelike</h2>
        {this.drawBoard()}
      </div>
    );
  }
}

export default MainBoard;
