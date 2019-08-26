import React from 'react';
import '../App.css';
import star from '../images/star.png'
import MovieOverlay from './movieoverlay'

class RatingScreen extends React.Component {
    constructor(props) {
      super(props);
      this.fetchData = this.fetchData.bind(this);
      this.moviedetail = this.moviedetail.bind(this);
      //this.openSavedPage = this.openSavedPage.bind(this);
      //this.closeSavedPage = this.closeSavedPage.bind(this);
      this.state = {movies: [], searchMovies:[], poster: "", title: "", plot:"", genre:"", director:"", actor:"",
                    released: "", runtime: "", savedPage: false};
      this.movies = [];
      this.defaultMovies= [];
      this.key = process.env.REACT_APP_API_KEY;
    }
   

    /*
    openSavedPage(e){
        e.preventDefault();
        console.log("Saved")
        this.setState({savedPage: true})
    }

    closeSavedPage(e){
        e.preventDefault();
        console.log("Closed")
        this.setState({savedPage: false})
    }
    */
    moviedetail(poster, title, plot, genre, director, actor, released, runtime){

        this.setState({poster: poster, title: title, plot: plot, genre: genre, director: director, actor: actor,
                        released: released, runtime: runtime})
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
        if (!(searched !== '' && regexConst.test(searched) === false)){
        try {
                const responsearray=[`https://www.omdbapi.com/?apikey=${this.key}&i=tt0111161`,
                `https://www.omdbapi.com/?apikey=${this.key}&i=tt0068646`,
                `https://www.omdbapi.com/?apikey=${this.key}&i=tt0468569`,
                `https://www.omdbapi.com/?apikey=${this.key}&i=tt0071562`,
                `https://www.omdbapi.com/?apikey=${this.key}&i=tt0167260`,
                `https://www.omdbapi.com/?apikey=${this.key}&i=tt0110912`,
                `https://www.omdbapi.com/?apikey=${this.key}&i=tt0108052`,
                `https://www.omdbapi.com/?apikey=${this.key}&i=tt0050083`,
                `https://www.omdbapi.com/?apikey=${this.key}&i=tt1375666`,
                `https://www.omdbapi.com/?apikey=${this.key}&i=tt0137523`];
                //promise all ensures all the async functions passed are resolved and returns a single promise
                await Promise.all(responsearray.map((response)=> fetch(response)
                            .then((response) => response.json())
                            .then((movies) => this.defaultMovies.push(movies))))
            

                this.defaultMovies.sort(function(a, b){return b.imdbRating - a.imdbRating})
                this.setState({movies: this.defaultMovies})

            }
            catch (error) {
                console.error(error);
            }
    }
    else {
        this.fetchData()
    }
    }

    render() {
        
        const searched = this.props.search;
        const regexConst = /^ /;
        const listMovies = this.defaultMovies.map((movie) =>
        <li className="list-inline-item .justify-content-*-center padding" key={movie.imdbID}>
            <a data-toggle="modal" data-val={movie.Plot} onClick={() => this.moviedetail(movie.Poster, movie.Title, movie.Plot, movie.Genre, movie.Director, movie.Actors, movie.Released, movie.Runtime)} href="#exampleModalCenter" className="a" ><div className="card cardw cardb">
                <img className="card-img-top card-img" src={movie.Poster} alt="Movie"/>
                <div className="card-body cardb">
                    <h4 className="card-title">{movie.Title}</h4>
                </div>
                <div className="card-footer text-muted cardb">
                    <span className="rating"><img src={star} className="star" height="20px" width="20px" alt="Rating"></img> {movie.imdbRating}</span>
                </div>
            </div></a>
        </li>
        );

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
        );}
        else{
            searchedMovies =""
        }


        if (searched !== '' && regexConst.test(searched) === false){
         
            //console.log(this.state.searchMovies)
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
        else if (!(searched !== '' && regexConst.test(searched) === false )){
            
            
                console.log("Default Movies" + this.state.movies)
                return (
                <div>
                    <div className="rating-header"/>
                        <div className="container-fluid">
                            <div>

                                <div className="row">
                                    <p className="search-title col-md display-4">Highest Rated Movies</p>
                                </div>
                            </div>

                            <div className="modal fade" id="exampleModalCenter"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <MovieOverlay title={this.state.title} plot={this.state.plot} released={this.state.released} runtime={this.state.runtime}
                                                genre={this.state.genre} director={this.state.director} actor={this.state.actor}/>
                            </div>

                            <ul className="list-inline flex container">
                                {listMovies}
                            </ul>

                            </div>
                    </div>
                );
            
        }
    }
  }


  export default RatingScreen;