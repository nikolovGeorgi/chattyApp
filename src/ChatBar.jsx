import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(){
    super();
  }

  handleInput(e){
    if (!(e.key === 'Enter')) {
      return;
    }
    this.props.handleUser(e);
  }

  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          placeholder="Your Name (Optional)"
          type="text"
          onKeyPress={this.handleInput.bind(this)}
          onBlur={this.props.handleUser}
          />
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          type="text"
          onKeyPress={this.props.handleMessage}
          />
      </footer>
    )
  }
}

export default ChatBar;
