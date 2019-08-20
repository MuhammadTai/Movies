import React from 'react';
import '../App.css';
import star from '../images/star.png'


class Home extends React.Component {
    constructor(props) {
      super(props);
      this.fetchData = this.fetchData.bind(this);
      this.moviedetail = this.moviedetail.bind(this);
      //this.defaultscreen = this.defaultscreen.bind(this);
      this.state = {movies: [], searchMovies:[], poster: "", title: "", plot:"", genre:"", director:"", actor:""};
      this.movies = [];
      this.defaultMovies= [];
      this.key = process.env.REACT_APP_API_KEY;
    }
   

    moviedetail(poster, title, plot, genre, director, actor){
        console.log("123")
        this.setState({poster: poster, title: title, plot: plot, genre: genre, director: director, actor: actor})
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
    else{
        this.fetchData()
    }
    }
    /*
                        <p className="card-text">{movie.Plot}</p>
                    <a href="/" className="btn btn-primary">More Detail</a>
    */
    render() {

        const searched = this.props.search;
        const regexConst = /^ /;
        const listMovies = this.defaultMovies.map((movie) =>
        <li className="list-inline-item .justify-content-*-center padding" key={movie.imdbID}>
            <a data-toggle="modal" data-val={movie.Plot} onClick={() => this.moviedetail(movie.Poster, movie.Title, movie.Plot, movie.Genre, movie.Director, movie.Actors)} href="#exampleModalCenter" className="a" ><div className="card cardw cardb">
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
            <div className="card cardw cardb">
                <img className="card-img-top cardw1" src={movie.Poster} alt="Movie"/>
                <div className="card-body cardb">
                    <h4 className="card-title">{movie.Title}</h4>
                </div>
            </div>
        </li>
        
        );
        }
        else{
            searchedMovies =""
        }
        if (searched !== '' && regexConst.test(searched) === false){
            //this.fetchData();
            //console.log(this.state.searchMovies)
            return (
                <div>
                    <p className="search-title">{searched}</p>
                    <p className="small-title">Movie Result: {this.state.searchMovies.length}</p>
                    <ul className="list-inline flex search-body">
                            {searchedMovies}
                    </ul>
                </div>
            );
        }
        else {
            //this.defaultscreen();
            
                console.log("Default Movies" + this.state.movies)
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="dropdown dropdown-padding col-md-3">
                                <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Categories
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" >Latest Movies</a>
                                    <a className="dropdown-item" >Highest-Grossing Movies</a>
                                    <a className="dropdown-item" >Saved Movies</a>
                                </div>
                            </div>
                            <p className="search-title col-md-6">Highest Rated Movies</p>
                        </div>
                        
                        <div className="modal fade" id="exampleModalCenter"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content cardb">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">{this.state.title}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p className="card-text">{this.state.plot}</p>
                                    <p className="text-size-footer">Genre: <span className="grey">{this.state.genre}</span></p>
                                    <p className="text-size-footer">Director: <span className="grey">{this.state.director}</span></p>
                                    <p className="text-size-footer">Cast: <span className="grey">{this.state.actor}</span></p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Favourite Movie</button>
                                </div>
                                </div>
                            </div>
                        </div>

                        <ul className="list-inline flex">
                            {listMovies}
                        </ul>

                    </div>
                );
            
        }
    }
  }


  export default Home;