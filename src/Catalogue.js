import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

class Catalogue extends Component {
  constructor(props){
    super(props);
    this.state = {
      comics: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    
  }

  componentWillMount(){
    fetch('https://gateway.marvel.com:443/v1/public/characters/'+this.props.id+'/comics?ts=1&apikey=e515bd2d0227c8da128173f00b5c1929&hash=a83b051d1fadacfedeeb2b09d46d4975')
    .then(results => {
      return results.json()
    }).then(d => {
      let style = {
        width: 150,
        margin: 10,
        'text-align': 'center',
        'display': 'inline-block',
        'cursor': 'pointer'
      }
      let comics = d.data.results.map(comic => {
        return (
          <div key={comic.results} style={style}>
            <Checkbox/>
            <h3>{comic.title}</h3>
          </div>
        )
      })
      this.setState({comics: comics })
      console.log("state",this.state.comics)
    })
  }

  render(){
    const style = {
      position: 'relative'
    }
    return(
      <div className="container1" style={style}>
        {this.state.comics}
      </div>
    )
  }
}

export default Catalogue;
