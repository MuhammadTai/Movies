import React from 'react';
import '../App.css';
import RatingScreen from './ratingscreen';
import WhatsOn from './whatsonscreen';
import { ReactComponent as Logo } from '../logo.svg';
import img1 from '../images/star_wars_logo-svg_.png'
import img2 from '../images/2000px-MarvelLogo.png'
import img3 from '../images/matrix.jpg'
import {HashRouter as Router, Route} from 'react-router-dom';


class Main extends React.Component {
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
        
              <nav className="navbar sticky-top nav-bg navbar-normal">
                  <a className="navbar-brand nav-title" href="/Movies/#/">
                      Movies <Logo style={{verticalAlign: "bottom"}} width="40" height="30" alt=""></Logo></a>
                  <a className="navbar-brand nav-text b" href="/Movies/#/home/whatson">
                      What's On </a>
                  <a className="navbar-brand nav-text b" href="/Movies/#/home/rating">
                      Highest Rated Movies </a>
                  <a className="navbar-brand nav-text b" href="/Movies/#/home/savedmovies">
                      Saved Movies </a>
                  <form className="form-inline search-bar">
                      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                          value={this.state.search} onChange={this.handleChange}/>
                      <button className="btn btn-outline-danger my-2 my-sm-0 search-btn" type="submit">Search</button>
                  </form>
              </nav>
            
              <nav className="navbar navbar-small sticky-top nav-bg collapse" id="navbarToggleExternalContent">
                  <a className="navbar-brand nav-title" href="/Movies/#/">
                      Movies <Logo style={{verticalAlign: "bottom"}} width="40" height="30" alt=""></Logo></a>
                  <a className="navbar-brand nav-text b" href="/Movies/#/home/whatson">
                      What's On </a>
                  <a className="navbar-brand nav-text b" href="/Movies/#/home/rating">
                      Highest Rated Movies </a>
                  <a className="navbar-brand nav-text b" href="/Movies/#/home/savedmovies">
                      Saved Movies </a>
                  <form className="form-inline search-bar">
                      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                          value={this.state.search} onChange={this.handleChange}/>
                      <button className="btn btn-outline-danger my-2 my-sm-0 search-btn" type="submit">Search</button>
                  </form>
              </nav>

              <nav className="navbar sticky-top nav-bg navbar-dark navbar-collapse">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
              </nav>

            <section className="body">
              <Route exact={true} path="/home/rating" component={()=>ratingscreen(this.state.search)}/>
              <Route exact={true} path ="/home/whatson" component={whatson}/>

            </section>
    
            <footer className="Footer">
              <div className="footer-text">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
            </footer>
  
        </Router>
        
      );
    }
  }

 const ratingscreen = ((ssearch) =>
    (
    <div>
        <section>
          <p className="App-title">Movie Database</p>
        </section>
        <section>
        <RatingScreen search={ssearch}></RatingScreen>
        </section>
    </div>
    ))

  const whatson = (() =>(
    <div>
        <WhatsOn></WhatsOn>
    </div>
  ))

  export default Main;

  /*<Route exact={true} path="/home" component={()=>ratingscreen(this.state.search)}/>*/ //only shows this when it is exactly /home
                                                                                          //other pages will use /home from welcome screen showing main header only

  