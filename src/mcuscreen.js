import React from 'react';
import './App.css';

class Mcu extends React.Component {
    constructor(props) {
      super(props);
      //this.handleChange = this.handleChange.bind(this);
      this.state = {};
    }
    
    /*
    handleChange(event) {
      this.setState({search: event.target.value});
      
    }
    */
    
    render() {
    
      return (
      
            <div>
                <p className="App-title Red">Marvel Cinematic Universe</p>
            </div>
    
   
        
      );
    }
  }

  export default Mcu;