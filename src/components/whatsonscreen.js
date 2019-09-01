import React from 'react';
import '../App.css';
import MovieOverlay from './movieoverlay';

class WhatsOn extends React.Component {
    constructor(props) {
      super(props);
      
      this.moviedetail = this.moviedetail.bind(this);
      this.state = {searchMovies:[],  movies:[], poster: "", title: "", plot:"", genre:[], director:"", actor:"",
                    released: "", runtime: "",  imdbID: "", genres: [], popularity:""};
      this.key = process.env.REACT_APP_API_KEY;
    } 

    moviedetail(poster, title, plot, genre, released, language, imdbID, popularity){
      for (let i = 0; i < genre.length; i++){
        for (let x= 0; x < this.state.genres.length; x++){
            if(this.state.genres[x].id === genre[i]){
                genre[i] = this.state.genres[x].name
            }
        }
        //genre[i] = this.state.genres.filter((g) => g.id === genre[i]);
      }


      this.setState({poster: poster, title: title, plot: plot, genre: genre,
        released: released, language: language, imdbID: imdbID, popularity: popularity})
    }
 
   async componentDidMount(){
    try {
      console.log("api called")
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.key}&language=en-US&page=1`);
      const responseJson = await response.json();
      const response_genre = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`);
      const responseJson_genre = await response_genre.json();
      //responseJson.sort(function(a, b){return b.imdbRating - a.imdbRating})
      this.setState({movies: responseJson.results, genres: responseJson_genre.genres})       

    }
    catch (error) {
        console.error(error);
    }
   }
    
    render() {
      const listMovies = this.state.movies.map((movie) =>
      <li className="list-inline-item .justify-content-*-center padding" key={movie.id}>
          <a data-toggle="modal" data-val={movie.overview} onClick={() => this.moviedetail(movie.backdrop_path, movie.title, movie.overview, movie.genre_ids, movie.release_date, movie.original_language, movie.id, movie.popularity)} href="#exampleModalCenter" className="a" ><div className="card cardw cardb">
              <img className="card-img-top card-img" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="Movie"/>
              <div className="card-body cardb">
                  <h4 className="card-title">{movie.title}</h4>
              </div>
          </div></a>
      </li>
      );

        return(
        <div>
          <div className="whatson-header"/>
          <div className="container-fluid">
              <p className="search-title display-4">What's On</p>
          </div>
          <div className="modal fade overlay-backgorund" id="exampleModalCenter"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <MovieOverlay poster={this.state.poster} title={this.state.title} plot={this.state.plot} released={this.state.released} language={this.state.language}
                genre={this.state.genre} popularity={this.state.popularity}/>
          </div>
          <ul className="list-inline flex container">
              {listMovies}
          </ul>
        </div>
        );
      
        
    
    }
  }

  export default WhatsOn;