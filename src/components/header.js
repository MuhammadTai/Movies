import React from 'react';
import '../App.css';
import Home from './homescreen';
import Mcu from './mcuscreen';
import { ReactComponent as Logo } from '../logo.svg';
import img1 from '../images/star_wars_logo-svg_.png'
import img2 from '../images/2000px-MarvelLogo.png'
import img3 from '../images/matrix.jpg'
import {HashRouter as Router, Route} from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {search: '', movies: ''};
    }
  
    handleChange(event) {
      this.setState({search: event.target.value});
      
    }

    //<img width="90" height="70" src={img2} className="img-fluid" alt="MCU"></img>
    //<img width="75" height="70" src={img1} className="img-fluid" alt="Star Wars"></img>
    //<img width="55" height="70" src={img3} className="img-fluid" alt="Matrix"></img>
    render() {
    
      return (
        <Router>
        
              <nav className="navbar sticky-top nav-bg">
                  <a className="navbar-brand nav-title b" href="/Movies/#/home">
                      Movies <Logo style={{verticalAlign: "bottom"}} width="40" height="30" alt=""></Logo></a>
                  <a className="navbar-brand mcu b" href="/Movies/#/home/mcu">
                      MCU </a>
                  <a className="navbar-brand starwars b" href="/Movies/#/home/sw">
                      Star Wars </a>
                  <a className="navbar-brand matrix b" href="/Movies/#/home/matrix">
                      Matrix </a>
                  <form className="form-inline">
                      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                          value={this.state.search} onChange={this.handleChange}/>
                      <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                  </form>
              </nav>
         

            <section className="body">
              <Route exact={true} path="/home" component={()=>home(this.state.search)}/>
              <Route exact={true} path ="/home/mcu" component={mcu}/>

            </section>
    
            <footer className="Footer">
              <div className="footer-text">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
            </footer>
  
        </Router>
        
      );
    }
  }

 const home = ((ssearch) =>
    (
    <div>
        <section>
          <p className="App-title">Movie Database</p>
        </section>
        <section>
        <Home search={ssearch}></Home>
        </section>
    </div>
    ))

  const mcu = (() =>(
    <div>
        <Mcu></Mcu>
    </div>
  ))

  export default Header;