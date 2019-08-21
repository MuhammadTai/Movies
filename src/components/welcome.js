import React from 'react';
import '../App.css';
import Main from './mainscreen';
import {HashRouter as Router, Route} from 'react-router-dom';

class Welcome extends React.Component {

    
    render() {
    
      return (
        <Router>
            <Route exact={true} path ="/" component={normal}/>
            <Route path ="/home" component={main}/>
        </Router>
        
      );
    }
  }

  const normal = (() =>(
    <div className="d-flex flex-column align-items-center welcome">
      <h1 className="App-title">Movie Database</h1>
      <p className="small-title">Browse through the highest rated movies and Search for desired movies</p>
      <a className="btn btn-danger center" href="/Movies/#/home/rating" role="button" >Browse Movies</a>
    
  </div>
  ))

  const main = (() =>(
    <div>
        <Main></Main>
    </div>
  ))

  export default Welcome;