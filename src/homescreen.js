import React from 'react';
import './App.css';


class Home extends React.Component {
    constructor(props) {
      super(props);
      this.fetchData = this.fetchData.bind(this);
      //this.defaultscreen = this.defaultscreen.bind(this);
      this.state = {movies: []};
      this.movies = [];
      this.defaultMovies= [];

    }
   
    //get the data at the start 
    async fetchData(){
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=f94e8b75&s=${this.props.search}`);
            const responseJson = await response.json();
            this.movies = responseJson;
            console.log(this.movies);
        }
        catch (error) {
            console.error(error);
        }
    }

    async componentDidMount(){
        try {
                const responsearray=[`http://www.omdbapi.com/?apikey=f94e8b75&i=tt0111161`,
                `http://www.omdbapi.com/?apikey=f94e8b75&i=tt0068646`,
                `http://www.omdbapi.com/?apikey=f94e8b75&i=tt0468569`,
                `http://www.omdbapi.com/?apikey=f94e8b75&i=tt0071562`,
                `http://www.omdbapi.com/?apikey=f94e8b75&i=tt0167260`];
                //promise all ensures all the async functions passed are resolved and returns a single promise
                await Promise.all(responsearray.map((response)=> fetch(response)
                            .then((response) => response.json())
                            .then((movies) => this.defaultMovies.push(movies))))
            
                console.log(this.defaultMovies);
                this.defaultMovies.sort(function(a, b){return b.imdbRating - a.imdbRating})
                this.setState({movies: this.defaultMovies})

            }
            catch (error) {
                console.error(error);
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
        if (searched !== '' && regexConst.test(searched) === false){
            this.fetchData();
            return (
                <div>
                    <p className="search-title">{searched}</p>
                
                </div>
            );
        }
        else {
            //this.defaultscreen();
            
                console.log(this.state.movies)
                return (
                    <div>
                        <p className="search-title">Highest Rated Movies</p>
                        <ul className="list-inline">
                            {listMovies}
                        </ul>

                    </div>
                );
            
        }
    }
  }


  export default Home;