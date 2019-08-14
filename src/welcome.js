import React from 'react';
import './App.css';
import Header from './header';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Welcome extends React.Component {

    
    render() {
    
      return (
        <Router>


            
            <Route exact={true} path ="/" component={normal}/>
            <Route path ="/home" component={header}/>
        </Router>
        
      );
    }
  }

  const normal = (() =>(
    <div className="welcome">
      <p className="App-title">Movie Database</p>
      <p className="small-title">Browse through the highest rated movies and Search for desired movies</p>
      <a className="btn btn-danger center" href="/home" role="button" >Browse Movies</a>
    
  </div>
  ))

  const header = (() =>(
    <div>
        <Header></Header>
    </div>
  ))

  export default Welcome;