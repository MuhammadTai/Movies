import React from 'react';
import '../App.css';
import RatingScreen from './ratingscreen';
import WhatsOn from './whatsonscreen';
import SearchScreen from './searchscreen';
import UpcomingScreen from './upcomingscreen'
import Logo from '../images/293x302-powered-by-square-green-3ee4814bb59d8260d51efdd7c124383540fc04ca27d23eaea3a8c87bfa0f388d.png';
import {HashRouter as Router, Route} from 'react-router-dom';
import {withRouter} from  'react-router-dom';



class Main extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.clearSearch = this.clearSearch.bind(this);
      this.state = {search: '', searchEnter:''};
    }
  
    handleChange(event) {
      console.log("onchange")
      this.setState({search: event.target.value});
    }
    
    handleSubmit(event){
  
      if((this.state.searchEnter === this.state.search)&&(window.location.href.endsWith("/search/"))){
        return;
      }
      //if(event.key === "Enter" && this.state.searchEnter !== event.target.value){
        this.setState({searchEnter:  this.state.search});
        console.log("onsub")
        this.props.history.push("/home/search/")
      //}
    }

    clearSearch(){
      this.setState({search:  "", searchEnter: ""});
    }
    
    render() {
      var whatson_color = {
        color: `#777777`
      }, 
      upcoming_color={
        color: `#777777`
      }, 
      rated_color={
        color: `#777777`
      }

      if (window.location.href.endsWith("/whatson")){
        whatson_color={
          color: `#ffffff`
        }
      }
      if (window.location.href.endsWith("/upcoming")){
        upcoming_color={
          color: `#ffffff`
        }
      }
      if (window.location.href.endsWith("/rating")){
        rated_color={
          color: `#ffffff`
        }
      }
      return (
        <Router>
              <nav className="navbar sticky-top nav-bg navbar-normal">
                  <a className="navbar-brand nav-title" href="/Movies/#/">
                      TheMovies <img src ={Logo} style={{verticalAlign: "bottom", width: "30px"}} alt=""></img></a>
                  <a className="navbar-brand nav-text b" style={whatson_color}  href="/Movies/?#/home/whatson">
                      What's On </a>
                  <a className="navbar-brand nav-text b" style={upcoming_color} href="/Movies/?#/home/upcoming">
                      Upcoming Movies </a>
                  <a className="navbar-brand nav-text b" style={rated_color} href="/Movies/?#/home/rating">
                      Highest Rated Movies </a>
                  <form className="form-inline search-bar" onSubmit={this.handleSubmit}>
                      <input className="form-control mr-sm-2 nav-bg" type="search" placeholder="Search" aria-label="Search"
                          value={this.state.search} onChange={this.handleChange} />
                      <button className="btn btn-outline-danger my-2 my-sm-0 search-btn" type="submit" value="Submit">Search</button>
                  </form>
              </nav>
            
              <nav className="navbar navbar-small sticky-top nav-bg collapse" id="navbarToggleExternalContent">
                  <a className="navbar-brand nav-title" href="/Movies/#/">
                      TheMovies <img src ={Logo} style={{verticalAlign: "bottom", width: "30px"}} alt=""></img></a>
                  <a className="navbar-brand nav-text b" style={whatson_color} href="/Movies/?#/home/whatson">
                      What's On </a>
                  <a className="navbar-brand nav-text b" style={upcoming_color} href="/Movies/?#/home/upcoming" >
                      Upcoming Movies </a>
                  <a className="navbar-brand nav-text b" style={rated_color} href="/Movies/?#/home/rating" >
                      Highest Rated Movies </a>
                  <form className="form-inline search-bar" onSubmit={this.handleSubmit}>
                      <input className="form-control mr-sm-2 nav-bg" type="search" placeholder="Search" aria-label="Search"
                          value={this.state.search} onChange={this.handleChange}/>
                      <button className="btn btn-outline-danger my-2 my-sm-0 search-btn" type="submit" value="Submit">Search</button>
                  </form>
              </nav>

              <nav className="navbar sticky-top nav-bg navbar-dark navbar-collapse">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
              </nav>

            <section className="body">
              <Route exact={true} path="/home/search" component={()=>searchscreen(this.state.searchEnter, this.state.search)}/>
              <Route exact={true} path="/home/rating" render={()=><RatingScreen></RatingScreen>}/>
              <Route exact={true} path ="/home/whatson" render={()=><WhatsOn></WhatsOn>}/>
              <Route exact={true} path ="/home/upcoming" render={()=><UpcomingScreen></UpcomingScreen>}/>
            </section>
    
            <footer className="Footer">
              <div className="footer-text">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY.</a></div>
              <div className="footer-text">This product uses the TMDb API but is not endorsed or certified by TMDb.</div>
            </footer>
  
        </Router>
        
      );
    }
  }


  const searchscreen = (ssearch, update) =>
  (
    <SearchScreen search={ssearch} update={update}></SearchScreen>
  )

  export default withRouter(Main);

  /*<Route exact={true} path="/home" component={()=>ratingscreen(this.state.search)}/>*/ //only shows this when it is exactly /home
                                                                                          //other pages will use /home from welcome screen showing main header only

  