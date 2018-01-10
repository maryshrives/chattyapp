import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.setUser = this.setUser.bind(this);
//    this.onPressEnter = this.onPressEnter.bind(this);
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

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    }
    this.socket.onmessage = this.addMessage;
  }

  // onPressEnter(event) {
  //   if (event.key === "Enter") {
  //     let username = this.state.currentUser.name;
  //     let message = event.target.value;
  //     console.log("user hit enter");
  //     this.storeMessage(username, message);
  //     event.target.value = ""; //clears message box after sending
  //   }
  // }

//   storeMessage(username, message) {
//     const newMessage = {
//       id: this.state.messages.length + 1, //increment the id for each message
//       username: username,
//       content: message
//     }
//     const messages = this.state.messages.concat(newMessage)
//     this.setState({messages: messages});
// console.log(messages);
//   }

  addMessage(rcvdMessage) {
    let newMessage = JSON.parse(rcvdMessage.data);
    this.state.messages.push(newMessage);
    this.setState({messages: this.state.messages});
  }

  //sending message to server
  sendMessage (event) {
    if(event.key === "Enter"){
      console.log(this.state.currentUser);
      let username = this.state.currentUser.name;
      let content = event.target.value;
      let newMessageAsObject = {
        username: username,
        content: content
      };
    console.log(newMessageAsObject);
    this.socket.send(JSON.stringify(newMessageAsObject));
    event.target.value = '';
    }
  }

  setUser(event) {
    const newUser = event.target.value;
    this.setState({currentUser: {name: newUser}});
  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name}
          sendMessage={this.sendMessage} setUser={this.setUser}/>
      </div>
    );
  }
}
export default App;
console.log("Rendering <App>")
