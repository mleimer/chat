import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ChatMessageList from './ChatMessageList/ChatMessageList';
import {loadMessages, postMessage, subscribeOnNewMessages} from '../../api/messageApi';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

function Chat() {

  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const stateRef = useRef();
  stateRef.current = {messages};

  useEffect(() => {
    loadMessages()
      .then((response) => {
        setMessages(response.data);
      });
  }, [setMessages]);

  useEffect(() => {
    subscribeOnNewMessages((response) => {
      let newMessages = [...stateRef.current.messages, JSON.parse(response.body)];
      setMessages(newMessages);
    });
  }, []);

  return (
    <div className={classes.container}>
      <ChatMessageList messages={messages}/>
      <form noValidate autoComplete="off">
        <TextField label="User name" value={userName} onChange={(event) => setUserName(event.target.value)}/>
        <TextField label="Message" value={message} onChange={(event) => setMessage(event.target.value)}/>
        <Button onClick={() => postMessage({userName, message})} variant="contained" color="primary">Send</Button>
      </form>
    </div>
  );
}


Chat.propTypes = {};

Chat.defaultProps = {};

export default Chat;