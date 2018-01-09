import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const message = this.props.messages.map(a => {
      return (<Message
        key={ a.id }
        username={ a.username }
        content={ a.content } />);
    })

    return (
      <main className="messages">
        {message}
      </main>

    );
  }
}

export default MessageList;
