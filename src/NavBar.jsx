import React, {Component} from 'react';

class NavBar extends Component {
  constructor(){
    super();
  }
  render(){
    console.log("Rendering <NavBar />");
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="userCount">{this.props.userCount} users Online</span>
      </nav>
    )
  }
}

export default NavBar;
