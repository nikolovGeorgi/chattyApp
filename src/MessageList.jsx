import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor (props){
    super(props);
  }
  render() {
    console.log("Rendering <MessageList />");
    return (
      <main className="messages">
        {this.props.messages.map(function(messages, index) {
          return (
            <Message
              key={index}
              username={messages.username}
              content={messages.content}
            />
          );
        })}
      </main>
    );
  }
}

export default MessageList;
