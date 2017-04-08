import React, {Component} from 'react';

class ChatBar extends Component {

  handleUserNameInput(e){
    if (!(e.key === 'Enter')) {
      return;
    }
    this.props.handleUser(e);
  }

  handleMessageInput(e){
    if (!(e.key === 'Enter')) {
      return;
    }
    this.props.handleMessage(e);
    e.target.value = '';
  }

  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          placeholder="Your Name (Optional)"
          type="text"
          onKeyPress={this.handleUserNameInput.bind(this)}
          onBlur={this.props.handleUser}
          />
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          type="text"
          onKeyPress={this.handleMessageInput.bind(this)}
          />
      </footer>
    )
  }
}

export default ChatBar;
