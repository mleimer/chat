import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ChatMessageList from './ChatMessageList/ChatMessageList';
import {loadMessages, postMessage, subscribeOnNewMessages} from '../../api/messageApi';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  messageAndButtonContainer: {
    display: 'flex',
    alignItems: 'baseline'
  },
  messageField: {
    marginRight: '0.5rem'
  }
}));

function Chat({userName}) {

  const classes = useStyles();
  const [messages, setMessages] = useState([]);
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

  const onSendMessage = () => {
    postMessage({userName, message});
    setMessage('');
  };

  return (
    <div className={classes.container}>
      <ChatMessageList messages={messages}/>
      <form noValidate autoComplete="off">
        <div className={classes.messageAndButtonContainer}>
          <TextField
            className={classes.messageField}
            label="Message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <Button
            onClick={onSendMessage}
            variant="contained"
            color="primary">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}


Chat.propTypes = {
  userName: PropTypes.string.isRequired
};

Chat.defaultProps = {};

export default Chat;