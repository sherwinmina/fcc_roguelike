import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
         <NavigationBar />
            {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
