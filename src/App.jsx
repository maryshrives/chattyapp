import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [],
    newUser: "Anonymous",
    onlineUsers: "1"
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount() {
 //   console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    }
    this.socket.onmessage = this.addMessage;
  }

  addMessage(rcvdMessage) {
    let newMessage = JSON.parse(rcvdMessage.data);
    if (newMessage.type === "onlineStatus") {
      this.setState({onlineUsers: newMessage.content});
      console.log("Users", this.state.onlineUsers);
    } else {
      this.state.messages.push(newMessage);
      this.setState({messages: this.state.messages});
    }
  }

  //sending message to server and gives it a type
  sendMessage (event) {
    if(event.key === "Enter"){
      let newUser = this.state.newUser;
      console.log(this.state.currentUser);
      let username = this.state.currentUser.name;
      let content = event.target.value;
      let type = "postMessage";
      if (newUser !== username) { //notification if user changes name
        let notificationMessage = {
          username: newUser,
          content: `${username} has changed their name to ${newUser}`,
          type: "notification"
        }
        console.log(notificationMessage);
        this.socket.send(JSON.stringify(notificationMessage));
      }
      this.setState({currentUser :{ name: this.state.newUser}});

      let newMessageAsObject = {
        username: newUser,
        content: content,
        type: "postMessage"
      };
    console.log(newMessageAsObject);
    this.socket.send(JSON.stringify(newMessageAsObject));
    event.target.value = ''; //clear the input boxes
    }
  }

  changeUser(event) {
    const newUser = event.target.value;
    this.setState({newUser: newUser});
  }

  render() {
    let statusValue = this.state.onlineUsers;

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="chatbar-online">{statusValue}</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name}
          sendMessage={this.sendMessage} changeUser={this.changeUser}/>
      </div>
    );
  }
}
export default App;