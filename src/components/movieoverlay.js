import React from 'react';
import '../App.css';

class MovieOverlay extends React.Component {

    
    render() {
    
      return (
        <div className="modal-dialog modal-dialog-centered model-width" role="document">
            <div className="modal-content cardb">
                <div className="modal-header modal-img">
                    <h5 className="modal-title upper" id="exampleModalCenterTitle">{this.props.title}</h5>
                </div>
                <div className="modal-body">
                    <p className="card-text">{this.props.plot}</p>
                    <p className="text-size-footer">Released: <span className="grey">{this.props.released}</span></p>
                    <p className="text-size-footer">Runtime: <span className="grey">{this.props.runtime}</span></p>
                    <p className="text-size-footer">Genre: <span className="grey">{this.props.genre}</span></p>
                    <p className="text-size-footer">Director: <span className="grey">{this.props.director}</span></p>
                    <p className="text-size-footer">Cast: <span className="grey">{this.props.actor}</span></p>
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