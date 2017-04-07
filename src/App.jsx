import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor () {
    super();
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
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
            break;
          case 'userColor':
          console.log(message, 'message in App');
            newState.currentUser.color = message.color;
            break;
          default:
            console.log('Unknown message type: ' + message.type);
            break;
        }
        this.setState({newState});
      }
    }
  }

  handleMessage (event){
    if (!(event.key === 'Enter')) {
      return;
    }
    const newMessage = {
        type: 'postMessage',
        color: this.state.currentUser.color,
        username: this.state.currentUser.name,
        content: event.target.value
    }
    // if(newMessage.username ===  'Anonymous') newMessage.color = 'black'
    const messages = this.state.messages.concat(newMessage);
    this.socket.send(JSON.stringify(newMessage))
    event.target.value = '';
  }
  handleUser (event){
    const oldUser = this.state.currentUser.name;
    const oldCol = this.state.currentUser.color;
    const newUser = event.target.value;
    if (oldUser === newUser) return;
    this.setState({currentUser: {name: newUser, color: oldCol}});
    let message = {
      type: 'postNewUserName',
      color: this.state.currentUser.color,
      username: newUser,
      content: oldUser + ' has changed their name to ' + newUser
    }
    this.socket.send(JSON.stringify(message));
    event.target.value = newUser;
  }

  render() {
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
