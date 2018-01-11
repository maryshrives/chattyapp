import React, {Component} from 'react';

class ChatBar extends Component {

  render () {
    const name = this.props.currentUser;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="choose a username" defaultValue={name} onChange={this.props.changeUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.sendMessage} />
      </footer>
     );
  }
}
export default ChatBar;
console.log('Rendering <ChatBar>')
