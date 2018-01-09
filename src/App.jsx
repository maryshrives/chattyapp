import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.storeMessage = this.storeMessage.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
  }

  //   componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }

  onPressEnter(event) {
    if (event.key === "Enter") {
      let username = this.state.currentUser.name;
      let message = event.target.value;
      console.log("user hit enter");
      this.storeMessage(username, message);
    }
  }

  storeMessage(username, message) {
    const newMessage = {
      id: this.state.messages.length + 1, //increment the id for each message
      username: username,
      content: message
    }
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages});
console.log(messages);
  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} onPressEnter={this.onPressEnter}/>
      </div>
    );
  }
}
export default App;
console.log("Rendering <App>")
