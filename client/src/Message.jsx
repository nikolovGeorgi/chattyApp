import React, {Component} from 'react';

class Message extends Component {
  checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  postImage(msg){
    if(this.checkURL(msg)){
      return (<img src={msg} />);
    } else {
      return msg
    }
  }

  render() {
    let style = {color: this.props.color};
    return (
      <div className="message">
        <span className="message-username" style={style}>{this.props.username}</span>
        <span className="message-content">{this.postImage(this.props.content)}</span>
      </div>
    );
  }
}
export default Message;
