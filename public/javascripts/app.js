import React from 'react';
import ReactDOM from 'react-dom';
import {analyze as Analyze} from '../../bot/comporator/index';
const HOST = 'https://sirinesiri.herokuapp.com';
const PORT = 3000;

var Main = React.createClass({
    render: function() {
        return (
            <div className="main">
                <ChatComponent />
            </div>
        )
    }
})

var ChatComponent = React.createClass({
    getInitialState: function() {
        return {
            messageIsEmpty: true
        };
    },
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.message).focus();
        this._listenSocket();
        this._socketOnSendMessage();
    },
    _listenSocket() {
        return io(HOST);
    },
    _socketOnSendMessage() {
        const socket = this._listenSocket();
        socket.on('send message', this._addMessage);
    },
    _socketEmitSendMessage(message) {
        if (typeof message !== 'undefined') {
            const socket = this._listenSocket();
            socket.emit('send message', message);
        }
    },
    _addMessage(data) {
         var chatWindow = document.getElementById('chat-window');
         chatWindow.innerHTML += 'You: ' + data + '\n';

         var message = ReactDOM.findDOMNode(this.refs.message).value || '';
         chatWindow.innerHTML += 'SiriNeSiri: ' + Analyze(message) + '\n';

         this._afterBtnClicked();
    },
    onButtonClick: function(e) {
        e.preventDefault();
        var message = ReactDOM.findDOMNode(this.refs.message).value;
        this._socketEmitSendMessage(message);
        return false;
    },
    _afterBtnClicked() {
        ReactDOM.findDOMNode(this.refs.message).value = '';
    },
    onFieldChange: function(fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({['' + fieldName]: false})
        }
        else {
            this.setState({['' + fieldName]: true})
        }
    },
    render: function() {
        var messageIsEmpty = this.state.messageIsEmpty;

        return (
            <div className="chatComponent">
                <form className='add'>
                    <textarea ref='message' placeholder='Message' onChange={this.onFieldChange.bind(this, 'messageIsEmpty')}></textarea>
                    <input onClick={this.onButtonClick} ref='sendButton' value='Send' type='button' disabled={messageIsEmpty} />
                </form>
            </div>
        )
    }
})

ReactDOM.render(
    <Main />,
    document.getElementById('chat-form')
)
