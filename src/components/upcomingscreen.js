import React from 'react';
import '../App.css';
import MovieModal from './moviemodal'

class UpcomingScreen extends React.Component {
    constructor(props) {
      super(props);
      this.close = this.close.bind(this);
      this.moviedetail = this.moviedetail.bind(this);
      this.state = {movies: [], searchMovies:[], poster: "", title: "", plot:"", genre:[], director:"", actor:"",
                    released: "", language: "",  imdbID: "", genres: [], popularity: "", show: false, loaded: false,
                    tagline: "", cast: [], modalloaded: false};
      this.movies = [];
      this.defaultMovies= [];
      this.key = process.env.REACT_APP_API_KEY;
    }

    close(){
        this.setState({show: false})
    }

 
    moviedetail(e, poster, title, plot, genre, released, language, imdbID, popularity){
        e.preventDefault();
        this.setState({show: true, modalloaded: false})
        for (let i = 0; i < genre.length; i++){
            for (let x= 0; x < this.state.genres.length; x++){
                if(this.state.genres[x].id === genre[i]){
                    genre[i] = this.state.genres[x].name
                }
            }
            
        }
        fetch(`https://api.themoviedb.org/3/movie/${imdbID}?api_key=${this.key}&language=en-US&page=1&append_to_response=credits`)
        .then((response)=>response.json())
        .then((result)=> this.setState({poster: poster, title: title, plot: plot, genre: genre,
                    released: released, language: language, imdbID: imdbID, popularity: popularity,
                    tagline: result.tagline, cast: result.credits.cast, modalloaded: true}))
    }
    
    controller = new AbortController();

    async componentDidMount(){
        
        
        try {
            console.log("api called")
            const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.key}&language=en-US&page=1`, {signal: this.controller.signal});
            const responseJson = await response.json();
            const response_genre = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`);
            const responseJson_genre = await response_genre.json();
            this.setState({movies: responseJson.results, genres: responseJson_genre.genres, loaded: true})       

        }
        catch (error) {
            console.error(error);
        }
    }

    componentWillUnmount(){
        this.controller.abort();
        console.log("unmount1")
        
    }


    render() {
        const listMovies = this.state.movies.map((movie) =>
        <li className="list-inline-item .justify-content-*-center padding" key={movie.id}>
            <a onClick={(e) => this.moviedetail(e, movie.backdrop_path, movie.title, movie.overview, movie.genre_ids, movie.release_date, movie.original_language, movie.id, movie.popularity)} href="#" className="a" ><div className="card cardw cardb">
                <img className="card-img-top card-img" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="Movie"/>
                <div className="card-body cardb">
                    <h4 className="card-title">{movie.title}</h4>
                </div>
            </div></a>
        </li>
        );

            //console.log("Default Movies" + this.state.movies)
            //console.log("Default Movies" + this.state.genre)
            return (
            <div>
                {!this.state.loaded ? 
                (<div className="d-flex flex-column justify-content-center" style={{height: '80vh', alignItems: 'center'}}>
                    <div className="spinner-border primary-color" role="status" style={{width: '3rem', height: '3rem'}}>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>) 
                : (
                    <div>
                        <div className="upcoming-header"/>
                        <div className="container-fluid">
                            <div>
                                <div className="row">
                                    <p className="search-title col-md display-4">Upcoming Movies</p>
                                </div>
                            </div>

                            <div className={this.state.show? "Movie-modal overlay-backgorund": "Hidden"} >
                                <MovieModal poster={this.state.poster} title={this.state.title} plot={this.state.plot} released={this.state.released} language={this.state.language}
                                        genre={this.state.genre} popularity={this.state.popularity} tagline={this.state.tagline} cast={this.state.cast} close={() => this.close()} 
                                        show={this.state.show} modalloaded={this.state.modalloaded}/>
                            </div>

                            <ul className="list-inline flex container">
                                {listMovies}
                            </ul>

                        </div>
                    </div>
                    )
                }
            </div>
            );
        

    }
  }

  export default UpcomingScreen;