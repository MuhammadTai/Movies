import React from 'react';
import '../App.css';
import star from '../images/star.png'


class RatingScreen extends React.Component {
    constructor(props) {
      super(props);
      this.fetchData = this.fetchData.bind(this);
      //this.fetchSave = this.fetchSave.bind(this);
      this.moviedetail = this.moviedetail.bind(this);
      //this.openSavedPage = this.openSavedPage.bind(this);
      //this.closeSavedPage = this.closeSavedPage.bind(this);
      //this.defaultscreen = this.defaultscreen.bind(this);
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


    //get the data at the start 
    async fetchData(){
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${this.key}&s=${this.props.search}`);
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
                const responsearray=[`http://www.omdbapi.com/?apikey=${this.key}&i=tt0111161`,
                `http://www.omdbapi.com/?apikey=${this.key}&i=tt0068646`,
                `http://www.omdbapi.com/?apikey=${this.key}&i=tt0468569`,
                `http://www.omdbapi.com/?apikey=${this.key}&i=tt0071562`,
                `http://www.omdbapi.com/?apikey=${this.key}&i=tt0167260`,
                `http://www.omdbapi.com/?apikey=${this.key}&i=tt0110912`,
                `http://www.omdbapi.com/?apikey=${this.key}&i=tt0108052`,
                `http://www.omdbapi.com/?apikey=${this.key}&i=tt0050083`,
                `http://www.omdbapi.com/?apikey=${this.key}&i=tt1375666`,
                `http://www.omdbapi.com/?apikey=${this.key}&i=tt0137523`];
                //promise all ensures all the async functions passed are resolved and returns a single promise
                await Promise.all(responsearray.map((response)=> fetch(response)
                            .then((response) => response.json())
                            .then((movies) => this.defaultMovies.push(movies))))
            
                /*
                const response = await Promise.all(responsearray.map((response)=> fetch(response)))
                const responseJson = await response.json();
                this.defaultMovies = responseJson
                */
                //console.log(this.defaultMovies);
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
                <img className="card-img-top cardw1" src={movie.Poster} alt="Movie"/>
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
                <img className="card-img-top cardw1" src={movie.Poster} alt="Movie"/>
                <div className="card-body cardb">
                    <h4 className="card-title">{movie.Title}</h4>
                </div>
            </div></a>
        </li>
        
        );
        }
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
                    <div className="container-fluid">
                        <div className="row">
                            <p className="search-title col-md display-4">Highest Rated Movies</p>
                        </div>
                        
                        <div className="modal fade" id="exampleModalCenter"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content cardb">
                                <div className="modal-header">
                                    <h5 className="modal-title upper" id="exampleModalCenterTitle">{this.state.title}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p className="card-text">{this.state.plot}</p>
                                    <p className="text-size-footer">Released: <span className="grey">{this.state.released}</span></p>
                                    <p className="text-size-footer">Runtime: <span className="grey">{this.state.runtime}</span></p>
                                    <p className="text-size-footer">Genre: <span className="grey">{this.state.genre}</span></p>
                                    <p className="text-size-footer">Director: <span className="grey">{this.state.director}</span></p>
                                    <p className="text-size-footer">Cast: <span className="grey">{this.state.actor}</span></p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger">Favourite Movie</button>
                                </div>
                                </div>
                            </div>
                        </div>

                        <ul className="list-inline flex container">
                            {listMovies}
                        </ul>

                    </div>
                );
            
        }
        /*
        else if (!(searched !== '' && regexConst.test(searched) === false && this.state.savedPage)){
            return(                    <div className="container-fluid">
            <div className="row">
                <div className="dropdown dropdown-padding col-md-3">
                    <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Categories
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a href={this.closeSavedPage} className="dropdown-item" >Highest Rated Movies</a>
                        <a href={this.openSavedPage} className="dropdown-item" >Saved Movies</a>
                        <a href={this.closeSavedPage} className="dropdown-item" >Latest Movies</a>
                    </div>
                </div>
                <p className="search-title col-md-6 display-4">Saved Movies</p>
                </div>
            </div>)    
            
        }
        */
    }
  }


  export default RatingScreen;


  /*
                              <div className="dropdown dropdown-padding col-md-3">
                                <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Categories
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a href="#" onClick={(e) => this.closeSavedPage(e)} className="dropdown-item" >Highest Rated Movies</a>
                                    <a href="#" onClick={(e) => this.openSavedPage(e)} className="dropdown-item" >Saved Movies</a>
                                    <a href="#" onClick={(e) => this.closeSavedPage(e)} className="dropdown-item" >Latest Movies</a>
                                </div>
                            </div>
    */