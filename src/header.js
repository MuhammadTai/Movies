import React from 'react';
import './App.css';
import Home from './homescreen';
import Mcu from './mcuscreen';
import { ReactComponent as Logo } from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {search: '', movies: ''};
    }
  
    handleChange(event) {
      this.setState({search: event.target.value});
      
    }

    
    render() {
    
      return (
        <Router>
            <div>
                <nav className="navbar sticky-top nav-bg">
                    <a className="navbar-brand nav-title" href="/">
                        Movies in React <Logo width="50" height="50" alt=""></Logo></a>
                    <a className="navbar-brand mcu" href="/mcu">
                        MCU </a>
                    <a className="navbar-brand starwars" href="/sw">
                        Star Wars </a>
                    <a className="navbar-brand matrix" href="/matrix">
                        Matrix</a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                            value={this.state.search} onChange={this.handleChange}/>
                        <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>
                <Route exact={true} path ="/" component={()=>home(this.state.search)}/>
                <Route path ="/mcu" component={mcu}/>
            
            </div>
    
        </Router>
        
      );
    }
  }

 const home = ((ssearch) =>
    (
    <div>
        <p className="App-title">Movie Web App</p>
        <Home search={ssearch}></Home>
    </div>
    ))

  const mcu = (() =>(
    <div>
        <Mcu></Mcu>
    </div>
  ))

  export default Header;