import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Catalogue from './Catalogue'
import AppBar from 'material-ui/AppBar';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import {grey50} from 'material-ui/styles/colors';
import CharacterList from './CharacterList'


const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: [],
      favourites: [],
      searchTerm: ''
    }
    this.baseState = this.state //log default values for App's state
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount(){
    var screen = [];
    screen.push(<CharacterList parentContext={this} searchTerm={this.state.searchTerm}/>)
    this.setState({screen: screen})
  }

  handleChange(e) {
    this.setState({searchTerm: e.target.value});
  }

  handleKeyUp(e){
    if (e.key === "Enter" && this.state.searchTerm !== ''){
      this.setState(this.baseState)
      var screen = [];
      screen.push(<CharacterList parentContext={this} searchTerm={this.state.searchTerm}/>)
      this.setState({screen:screen[0]});
    }
  }

  render() {
    let titleStyle = {
      'margin-left': '45%'
    }
    const style = {
      margin: '10px auto',
      border: '2px solid black',
      width: '50%',
      'text-align': 'center',
      height: '50%',
      padding: 10
    }
    return (<div>
      <MuiThemeProvider>
        <AppBar title={<span style={titleStyle}>ComicScout</span>}
        iconElementLeft={<IconButton><HomeIcon color={grey50} onClick={this.handleClick}/></IconButton>}/>
        <div className="App">
          <div style={style}>
            <input type="text" value={this.state.searchTerm} onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
            {this.state.screen}
          </div>
        </div>
      </MuiThemeProvider>
    </div>);
  }
}

export default App;
