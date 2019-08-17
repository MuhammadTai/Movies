import React from 'react';
import './App.css';


class Home extends React.Component {
    constructor(props) {
      super(props);
      this.fetchData = this.fetchData.bind(this);
      
      //this.defaultscreen = this.defaultscreen.bind(this);
      this.state = {movies: [], searchMovies:[]};
      this.movies = [];
      this.defaultMovies= [];
      this.key = process.env.REACT_APP_API_KEY;
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
    
    render() {

        const searched = this.props.search;
        const regexConst = /^ /;
        const listMovies = this.defaultMovies.map((movie) =>
        <li className="list-inline-item .justify-content-*-center padding" key={movie.imdbID}>
            <div className="card cardw">
                <img className="card-img-top cardw1" src={movie.Poster} alt="Movie"/>
                <div className="card-body cardb">
                    <h4 className="card-title">{movie.Title} ({movie.imdbRating})</h4>
                    <p className="card-text">{movie.Plot}</p>
                    <a href="/" className="btn btn-primary">More Detail</a>
                </div>
            </div>
        </li>
        );
        if(this.state.searchMovies.length > 0){
        var searchedMovies = this.state.searchMovies.map((movie) =>
        <li className="list-inline-item .justify-content-*-center padding" key={movie.imdbID}>
            <div className="card cardw">
                <img className="card-img-top cardw1" src={movie.Poster} alt="Movie"/>
                <div className="card-body cardb">
                    <h4 className="card-title">{movie.Title}</h4>
                    <p className="card-text">{movie.Plot}</p>
                    <a href="/" className="btn btn-primary">More Detail</a>
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
                    <ul className="list-inline flex">
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

                        <p className="search-title">Highest Rated Movies</p>
                        <ul className="list-inline flex">
                            {listMovies}
                        </ul>

                    </div>
                );
            
        }
    }
  }


  export default Home;