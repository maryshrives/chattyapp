import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = {content: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({content: event.target.value});
  }

  handleSubmit(event) {
    if (event.key === "Enter") {
      this.props.changeHandler(this.state.content);
      event.target.value = ""; //clears message box after sending
    }
  }


  render () {

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleSubmit} onChange={this.handleChange} />
      </footer>
     );
  }
}
export default ChatBar;
console.log("Rendering <ChatBar>")
