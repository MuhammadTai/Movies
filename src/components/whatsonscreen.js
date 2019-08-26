import React from 'react';
import '../App.css';

class WhatsOn extends React.Component {
    constructor(props) {
      super(props);
      this.fetchData = this.fetchData.bind(this);
      this.state = {searchMovies:[]};
      this.key = process.env.REACT_APP_API_KEY;
    }
    
    

   async fetchData(){
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${this.key}&s=${this.props.search}`);
        const responseJson = await response.json();
        console.log(responseJson.Response)
        if (responseJson.Response === "True"){
            this.setState({searchMovies: responseJson.Search}) 
        }
        console.log(this.state.searchMovies);
        
    }
    catch (error) {
        console.error(error);
    }
  }


   async componentDidMount(){
    const searched = this.props.search;
    const regexConst = /^ /;
    if ((searched !== '' && regexConst.test(searched) === false)){
      this.fetchData()
    }
   }
    
    render() {
      const searched = this.props.search;
      const regexConst = /^ /;
      if(this.state.searchMovies.length > 0){
        var searchedMovies = this.state.searchMovies.map((movie) =>
        <li className="list-inline-item .justify-content-*-center padding" key={movie.imdbID}>
            <a><div className="card cardw cardb">
                <img className="card-img-top cardw-img" src={movie.Poster} alt="Movie"/>
                <div className="card-body cardb">
                    <h4 className="card-title">{movie.Title}</h4>
                </div>
            </div></a>
        </li>
        )}
      else{
          searchedMovies =""
      }
    
      if (searched !== '' && regexConst.test(searched) === false){
        
              return (
                  <div>
                      <p className="search-title display-4">{searched}</p>
                      <p className="small-title">Movie Result: {this.state.searchMovies.length}</p>
                      <ul className="flex container list-inline ">
                              {searchedMovies}
                      </ul>
                  </div>
              );
        }

      else{
        return(
        <div>
          <div className="whatson-header"/>
          <div className="container-fluid">
              <p className="search-title display-4">What's On</p>
          </div>
        </div>
        );
      }
   
        
    
    }
  }

  export default WhatsOn;