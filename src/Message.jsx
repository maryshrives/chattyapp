import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering Msg");

    return (
      <div className="message">
        <span className="message-username">Anonymous1</span>
        <span className="message-content">It's lunchtime</span>
      </div>

    );
  }
}

export default Message;