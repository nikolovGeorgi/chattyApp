import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor () {
    super();
    this.state = {
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0
    }
    this.handleMessage = this.handleMessage.bind(this);
    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://127.0.0.1:3001');
    this.socket.onopen = () => {
      console.log('got a connection!');
      this.socket.onmessage = (messageEvent) => {
        const message = JSON.parse(messageEvent.data);
        let newState = this.state;
        switch (message.type){
          case 'incomingMessage':
            newState.messages.push(message);
            break;
          case 'incomingNewUserName':
            newState.messages.push(message);
            break;
          case 'userCount':
            newState.userCount = message.userCount;
        }
        this.setState({newState});
      }
    }

  }

  handleMessage (event){
    if (!(event.key === 'Enter')) {
      return;
    }
    const newMessage = {type: 'postMessage', username: this.state.currentUser.name, content: event.target.value};
    const messages = this.state.messages.concat(newMessage);
    event.target.value = '';
    this.socket.send(JSON.stringify(newMessage))
  }
  handleUser (event){
    const oldUser = this.state.currentUser.name;
    const newUser = event.target.value;
    this.setState({currentUser: {name: newUser}});
    let message = {
      type: 'postNewUserName',
      username: newUser,
      content: oldUser + ' has changed their name to ' + newUser
    }
    event.target.value = newUser;
    this.socket.send(JSON.stringify(message));
  }

  render() {
    console.log("Rendering <App />")
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar handleMessage={this.handleMessage} value={this.state.currentUser.name} handleUser={this.handleUser}/>
      </div>
    );
  }
}
export default App;
