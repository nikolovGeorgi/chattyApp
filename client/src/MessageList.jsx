import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor (props){
    super(props);
  }
  render() {
    return (
      <main className="messages">
        {this.props.messages.map(function(messages) {
          return (
            <Message
              key={messages.uuid}
              color={messages.color}
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
