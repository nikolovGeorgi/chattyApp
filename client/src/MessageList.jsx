import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map(function(message) {
          if (message.type === 'incomingMessage') {
            return(
              <Message
                key={message.uuid}
                color={message.color}
                username={message.username}
                content={message.content}
              />
            );
          } else {
            return(
              <div className="message system">{message.content}</div>
            );
          }
        })}
      </main>
    );
  }
}

export default MessageList;
