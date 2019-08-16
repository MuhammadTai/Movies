import React from 'react';
import './App.css';
import Header from './header';
import {HashRouter as Router, Route} from 'react-router-dom';

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
    <div className="welcome container-fluid">
      <h1 className="App-title">Movie Database</h1>
      <p className="small-title">Browse through the highest rated movies and Search for desired movies</p>
      < a className="btn btn-danger center" href="/Movies/#/home" role="button" >Browse Movies</a>
    
  </div>
  ))

  const header = (() =>(
    <div>
        <Header></Header>
    </div>
  ))

  export default Welcome;