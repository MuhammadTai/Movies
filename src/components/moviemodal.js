import React from 'react';
import '../App.css';

class MovieModal extends React.Component {
    constructor(props) {
        super(props);
        this.clickEvent = this.clickEvent.bind(this);
        this.keyEvent = this.keyEvent.bind(this);
      }

    componentDidMount(){
        document.addEventListener('mouseup', this.clickEvent, false)
        document.addEventListener('keyup', this.keyEvent, false);
    }
    componentWillUnmount(){
        console.log("unmount")
        document.removeEventListener('mouseup', this.clickEvent, false)
        document.addEventListener('keyup', this.keyEvent, false);
    }

    clickEvent=(e)=>{
        if(this.node.contains(e.target) && this.props.show){
            //console.log("inside")
            return;
        }

        else if(!(this.node.contains(e.target)) && this.props.show){
            //console.log("close")
            this.props.close()
        }
    }

    keyEvent=(e)=>{
        if(e.keyCode === 27 && this.props.show){
            this.props.close()
        }
    }

    render() {
    if(this.props.show &&  !(document.body.className.includes("Overflow-hidden"))){
        document.body.className = "Overflow-hidden"
        //console.log(document.body.className)
    }
    else if(!(this.props.show) && (document.body.className.includes("Overflow-hidden"))){
        document.body.className = "Overflow-visible"
        //console.log("show"+ document.body.className)
    }

    const modalPoster = {
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(https://image.tmdb.org/t/p/w780/${this.props.poster})`,
        justifyContent: `unset`
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
    let castList =""

    if (this.props.cast.length > 0){
        while(this.props.cast.length > 8)
        {   
            this.props.cast.pop()
        }

        
        castList = this.props.cast.map((member)=>
            <li className="list-inline-item .justify-content-*-center" key={member.id}>
                
                <p className="text-size-footer lightgrey">{member.name}<span className="grey"> {
                    this.props.cast.indexOf(member)!== 7 ? 
                         (`(${member.character}),`):(`(${member.character})`)
                    }</span></p>
            </li>
        )
    }
      return (
        <div className="modal-dialog modal-dialog-centered model-width" role="document" ref={(e) => this.node = e}>
            <div className="modal-content cardb">
                <div className="modal-header modal-img flex-column"  style={modalPoster}>
                    <h5 className="modal-title upper" id="exampleModalCenterTitle">{this.props.title}</h5>
                    <p className="modal-title Tagline">{this.props.tagline}</p>
                </div>
                <div className="modal-body">
                    <p className="card-text">{this.props.plot}</p>
                    <p className="text-size-footer">Released: <span className="grey upper">{this.props.released}</span></p>
                    <p className="text-size-footer">Language: <span className="grey upper">{this.props.language}</span></p>
                    <p className="text-size-footer">Genre: <span className="grey">{genre}</span></p>
                    <p className="text-size-footer">Popularity: <span className="grey">{this.props.popularity}</span></p>
                    <p className="text-size-footer float-left">Cast: </p>
                    <ul className="d-flex list-inline flex-wrap Cast">
                        {castList}
                    </ul>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.props.close}>Close</button>
                    <button type="button" className="btn btn-danger background-btn">Favourite Movie</button>
                </div>
            </div>
        </div>
        
      );
    }
  }

  //<img src={`https://image.tmdb.org/t/p/w185/${member.profile_path}`} alt=""></img>

  export default MovieModal;
