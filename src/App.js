import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const MY_KEY = 'ce57e0379a89e201b70311bdd6960086';
class App extends Component {

  constructor(){
      super();
      this.state = {
        pictures: [],
        indexValue: 0,
        textInput:'Miami'
      };
    }

    componentDidMount(){
      this.loadImage();
    }


    loadImage = () => {
      if (this.state.textInput.trim().length === 0){
        alert("Please enter some words to search.");
        return;
      }
      fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+MY_KEY+'&tags='+this.state.textInput+'&per_page=100&page=1&format=json&nojsoncallback=1')
      .then(function(response){
        return response.json();
      })
      .then(function(j){
      //alert(JSON.stringify(j));

        let picArray = j.photos.photo.map((pic) => {

          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
          return(
            <img alt="flickr pics" className="pictureClass" src={srcPath}></img>
          )
        })
        this.setState({pictures: picArray});
      }.bind(this))
    }

  changeHandler = (e) => {
    this.setState({textInput: e.target.value});
    this.setState({indexValue: 0});
  }

  preHandler = () => {
    var currentIndex = this.state.indexValue;
    if(this.state.indexValue === 0){
      this.setState({indexValue:99});
    }
    else{
      currentIndex= currentIndex-1;
    }
    this.setState({indexValue: currentIndex});
  }

  nextHandler = () => {
    var currentIndex = this.state.indexValue;
    if(this.state.indexValue === 99){
      this.setState({indexValue:0});
    }
    else{
      currentIndex= currentIndex+1;
    }
    this.setState({indexValue: currentIndex});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
           <h1 className="App-title">Flickr Search Tool</h1>
        </header>
        <p className = "App-intro">
        <p>
        <input placeholder="search pictures here" className = "textInput"
            onChange = {this.changeHandler}
        ></input><button onClick={this.loadImage}>Search</button>
        </p>
        <div>
          100 pictures of {this.state.textInput}
        </div>
        <p class="content-box">
         {this.state.pictures[this.state.indexValue++]}
          {this.state.pictures[this.state.indexValue++]}
           {this.state.pictures[this.state.indexValue++]}
           {this.state.pictures[this.state.indexValue++]}
           {this.state.pictures[this.state.indexValue++]}
           {this.state.pictures[this.state.indexValue]}
        </p>

        </p>
        <div>
           <button onClick={this.preHandler}>Prev</button>&nbsp;
           <button onClick={this.nextHandler}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
