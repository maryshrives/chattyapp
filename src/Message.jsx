import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.type == 'postMessage') {
      return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>);
//use different format for notification
    } else if (this.props.type == 'notification') {
      return (
        <div className="message system">
          {this.props.content}
        </div>);
    }
  }
}


export default Message;
console.log('Rendering <Messages>');
