import React from 'react';
import '../App.css';

class MovieOverlay extends React.Component {

    
    render() {
    const modalPoster = {
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(https://image.tmdb.org/t/p/w780/${this.props.poster})`
    };

    let genre ="";
    for(let i = 0; i< this.props.genre.length; i++){
        if (i !== this.props.genre.length-1 && this.props.genre.length>0){
            genre += `${this.props.genre[i]}, `;
        } 
        else if (i === this.props.genre.length-1 && this.props.genre.length>0){
            genre += `${this.props.genre[i]}`;
        }
        else{
            genre += `${this.props.genre[i]}`;
        }
    }
      return (
        <div className="modal-dialog modal-dialog-centered model-width" role="document">
            <div className="modal-content cardb">
                <div className="modal-header modal-img"  style={modalPoster}>
                    <h5 className="modal-title upper" id="exampleModalCenterTitle">{this.props.title}</h5>
                </div>
                <div className="modal-body">
                    <p className="card-text">{this.props.plot}</p>
                    <p className="text-size-footer">Released: <span className="grey upper">{this.props.released}</span></p>
                    <p className="text-size-footer">Language: <span className="grey upper">{this.props.language}</span></p>
                    <p className="text-size-footer">Genre: <span className="grey">{genre}</span></p>
                    <p className="text-size-footer">Popularity: <span className="grey">{this.props.popularity}</span></p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger background-btn">Favourite Movie</button>
                </div>
            </div>
        </div>
        
      );
    }
  }


  export default MovieOverlay;