import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map(function(message) {
          return (
            <Message
              key={message.uuid}
              color={message.color}
              username={message.username}
              content={message.content}
            />
          );
        })}
      </main>
    );
  }
}

export default MessageList;
