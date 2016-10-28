import React from 'react';
import ReactDOM from 'react-dom';

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
            usernameIsEmpty: true,
            messageIsEmpty: true
        };
    },
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.username).focus();

        this._listenSocket();

    },
    _listenSocket() {
        const socket = io("http://127.0.0.1:3000");
        socket.on('send message', this._addMessage);
    },
    _addMessage(data) {
         var chatWindow = document.getElementById('chat-window')
         chatWindow.innerHTML += data;

    },
    onButtonClick: function(e) {
        e.preventDefault();
        var username = ReactDOM.findDOMNode(this.refs.username).value;
        var message = ReactDOM.findDOMNode(this.refs.message).value;

        const socket = io("http://127.0.0.1:3000");
        socket.emit('send message', username + ': ' +message + '\n');

        username = '';
        message = '';
        return false;
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
        var usernameIsEmpty = this.state.usernameIsEmpty;
        var messageIsEmpty = this.state.messageIsEmpty;

        return (
            <div className="chatComponent">
                <form className='add'>
                    <input type='text' ref='username' placeholder='Username' onChange={this.onFieldChange.bind(this, 'usernameIsEmpty')}/>
                    <textarea ref='message' placeholder='Message' onChange={this.onFieldChange.bind(this, 'messageIsEmpty')}></textarea>
                    <input onClick={this.onButtonClick} ref='sendButton' value='Send' type='button' disabled={usernameIsEmpty || messageIsEmpty} />
                </form>
            </div>
        )
    }
})

ReactDOM.render(
    <Main />,
    document.getElementById('chat-form')
)
