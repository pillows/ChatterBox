import React from "react";
import ReactDOM from "react-dom";

import LioWebRTC from "liowebrtc";
import Moment from "react-moment";
import queryString from "query-string";
import "./chatTwo.scss";

class Chat extends React.Component {
  constructor(props) {
      console.log(props.location.search);
    let params = queryString.parse(props.location.search); // ? params.username : "Anonymous";

    super(props);
    this.state = {
      nick: params.username,
      message: "",
      peers: [],
      room: "sandbox-room",
      chatLog: []
    };
  }

  componentDidMount() {
    console.log(this.state.nick);
    this.webrtc = new LioWebRTC({
      debug: true,
      dataOnly: true,
      url: "https://sandbox.simplewebrtc.com:443/",
      nick: this.state.nick
    });

    this.webrtc.on("readyToCall", () => this.webrtc.joinRoom(this.state.room));
    this.webrtc.on("connectivityError", this.handleConnectionError);
    this.webrtc.on("receivedPeerData", this.handleDataReceived);
  }

  handleDataReceived = (type, data, peer) => {
    const dateToFormat = new Date();
    let chatObj = {
      time: dateToFormat,
      message: data.message,
      nick: data.nick,
    };
    this.setState({
      message: this.state.message,
      chatLog: [...this.state.chatLog, chatObj]
    });
  };


  handleConnectionError = peer => {
    const pc = peer.pc;
    console.log("had local relay candidate", pc.hadLocalRelayCandidate);
    console.log("had remote relay candidate", pc.hadRemoteRelayCandidate);
  };
  readyToCall = () => {
    // Starts the process of joining a room.
    this.webrtc.joinRoom(this.state.room, (err, desc) => {});
  };

  disconnect = () => {
    this.webrtc.stopLocalVideo();
    this.webrtc.leaveRoom();
    this.webrtc.disconnect();
  };

  componentWillUnmount() {
    this.disconnect();
  }

  sendMessage = message => {
    const dateToFormat = new Date();
    const chatObj = {
      time: dateToFormat,
      nick: this.state.nick,
      message: message
    };
    this.webrtc.shout("chat", chatObj);

    this.setState({
      chatLog: [...this.state.chatLog, chatObj],
      message: "",
      typing: false
    });
  };

  // This will execute whenever new data is added to the chatLog
  componentDidUpdate(prevProps) {
      /*
    let chatEl= document.getElementById('messages');
    chatEl.scrollTop = chatEl.scrollHeight;
    */
    window.scrollTo(screen.width+1, screen.height+1)
  }

  keyPress = e => {
    // This will only add the message when the Enter key is pressed
    if (e.key === "Enter") {
      let message = e.target.value;
      let encMessage = message; //encryptMessage(message);
      // Encrypt the message before inserting it to chatLog
      e.target.value = "";
      // Reset the input to allow for the next message

      const dateToFormat = new Date();

      console.log(encMessage);

      // the Message object that includes, time, message, and author
      let chatObj = {
        time: dateToFormat,
        message: encMessage,
        nick: this.state.nick
      };
      this.setState({
        message: encMessage,
        chatLog: [...this.state.chatLog, chatObj]
      });
      this.sendMessage(encMessage);
    }
  };

  render() {

    const singleMessage = (chat, index) => {
      //console.log(chat);


      return (
        <div key={index}>
          <span className="time">
            [<Moment format="HH:mm:ss A" date={chat.time} />]
          </span>
          <span className="who">{chat.nick}</span>
          <pre className="message">{chat.message}</pre>
        </div>
      );


    };
    return (

      <section id="container">

          <div className="modal fade" id="keyModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Modal title</h4>
                </div>
                <div className="modal-body">
                  <p>One fine body&hellip;</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        <div id="wrapper">
          <div id="message-area">
            <div id="messages">
                {this.state.chatLog.map(singleMessage)}
            </div>
            <div id="input">
                    <input
                        id="chatbox"
                      className="form-control"
                      type="text"
                      placeholder="Enter a message... press [enter] to send."
                      onKeyUp={this.keyPress}
                    />
        	</div>

          </div>
        </div>
      </section>

    );
  }
}

export default Chat;
