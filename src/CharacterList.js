import React, { Component } from 'react';
import Catalogue from './Catalogue'

import RaisedButton from 'material-ui/RaisedButton'

class CharacterList extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
    this.baseState = this.state;
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    var catalogue = [];
    catalogue.push(<Catalogue id={e}/>)
    this.props.parentContext.setState({screen:catalogue})
  }

  componentDidMount(){
    var searchTerm = this.props.searchTerm !== '' ? "nameStartsWith=" + this.props.searchTerm + "&" : ""
    fetch('http://gateway.marvel.com/v1/public/characters?'+searchTerm+'ts=1&apikey=e515bd2d0227c8da128173f00b5c1929&hash=a83b051d1fadacfedeeb2b09d46d4975')
    .then(results => {
      return results.json()
    }).then(d => {
      let style = {
        margin: 10
      }
      let list = d.data.results.map(character => {
        if (character.comics.available !== 0){ //to filter characters that feature in 0 comics to date (maybe theyŕe just concepts of characters that are nonetheless included in Marvel's API?)
          return (
            <div key={character.results} style={style}>
              <RaisedButton label={character.name} onClick={this.handleClick.bind(this,character.id)}/>
            </div>
          )
        }
      })
      this.setState({list: list})
    })
  }

  render() {
    return (
      <div>{this.state.list}</div>
    )
  }
}

export default CharacterList
