import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import image from './images/bspVectorBrown.png';




export class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <>
      <div className="fullPageWrapper d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-center homeLayout">
          <img src={image} alt="Brick Store" className="logo"/>
          <h1 >chat</h1>
          <Link to='/login' className="h3">Login</Link>
        </div>
      </div>
        
      </>
    )
  }
}

export default App



