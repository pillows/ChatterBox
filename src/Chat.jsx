import React from 'react';
import ReactDOM from 'react-dom';
import './chat.scss';
import LioWebRTC from 'liowebrtc';
import Moment from 'react-moment';
import queryString from 'query-string';



class Chat extends React.Component {
    constructor(props){
        let params = queryString.parse(props.location.search);

        super(props);
        this.state = {
            nick: params.username,
            message: '',
            peers: [],
            room:'sandbox-room',
            chatLog: [],
        }
    }

    componentDidMount() {
        console.log(this.state.nick);
      this.webrtc = new LioWebRTC({
        debug: true,
        dataOnly: true,
        url: 'https://sandbox.simplewebrtc.com:443/',
        nick: this.state.nick
      });

      this.webrtc.on('readyToCall', () => this.webrtc.joinRoom(this.state.room));
      this.webrtc.on('connectivityError', this.handleConnectionError);
      this.webrtc.on('receivedPeerData', this.handleDataReceived);

        }

        handleDataReceived = (type, data, peer) => {
          const dateToFormat = new Date();
          let chatObj = {
              time: dateToFormat,
              message: data.message,
              nick: data.nick
          }
          this.setState({
              message: this.state.message,
              chatLog: [...this.state.chatLog, chatObj]
          });
        }

     /*}
    generateRemotes = () => this.state.peers.map((p) => (
        conole.log(p);
    ));
    */
    componentDidUpdate(prevProps) {
        document.getElementById('messages').lastChild.scrollIntoView(false)
  }

    }

    handleConnectionError = (peer) => {
        const pc = peer.pc;
        console.log('had local relay candidate', pc.hadLocalRelayCandidate);
        console.log('had remote relay candidate', pc.hadRemoteRelayCandidate);
      }
        readyToCall = () => {
        // Starts the process of joining a room.
        this.webrtc.joinRoom(this.state.room, (err, desc) => {
        });
      }

      disconnect = () => {
        this.webrtc.stopLocalVideo();
        this.webrtc.leaveRoom();
        this.webrtc.disconnect();
      }

      componentWillUnmount() {
        this.disconnect();
      }


      sendMessage = (message) => {
          const dateToFormat = new Date();
          const chatObj = {
              time: dateToFormat,
            nick: this.state.nick,
            message: message
          };
          this.webrtc.shout('chat', chatObj);
          this.setState({
            chatLog: [...this.state.chatLog, chatObj],
            message: '',
            typing: false
          });

      }

    keyPress = (e) =>{

        if(e.key === 'Enter'){
            let message = e.target.value;
            e.target.value = '';

            const dateToFormat = new Date();
            console.log(this.state.nick);
            let chatObj = {
                time: dateToFormat,
                message: message,
                nick: this.state.nick
            }
            this.setState({
                message: message,
                chatLog: [...this.state.chatLog, chatObj]
            });
            this.sendMessage(message);
        }
    }


    render(){
        const singleMessage = (chat, index) => {
            //console.log(chat);
            return(
                <div className="chat-message" key={index}>
                    <div className="message-time">[<Moment format="H:m:s" date={chat.time} />]</div>
                    <div className="message-author">{chat.nick}: </div>
                    <div className="message-content">{chat.message}</div>
                </div>
            )
        }
        return(
        <section id="container">
            <div className="chat-box">
                <div className="chat-header ui-widget-header">ChatterBox</div>
                <div className="chat-content-wrapper row" >
                    <div className="users-list col-lg-3"><span>1</span><span> Users Online:</span>
                        <div className="chat-user yourself"><span>» </span><span>Player1</span></div>
                        <div className="chat-user"><span>» </span><span>player2</span></div>
                    </div>
                    <div className="chat-messages col-lg-9">
                        {this.state.chatLog.map(singleMessage)}
                    </div>
                    {/*
                    <div className="chat-messages col-lg-9">
                        <div className="chat-message">
                            <div className="message-time">[14:12]</div>
                            <div className="message-author">author: </div>
                            <div className="message-content">test</div>
                        </div>
                        <div className="chat-message">
                            <div className="message-time">[14:12]</div>
                            <div className="message-author">author: </div>
                            <div className="message-content">tes</div>
                        </div>
                    </div>
                    */}
                </div>
                <input type="text"
                    className="form-control"
                    onKeyUp={this.keyPress}
                    placeholder="Enter a message... press [enter] to send" />

            </div>
        </section>
        );
    }
}

export default Chat;
