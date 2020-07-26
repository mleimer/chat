import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ChatMessageList from './ChatMessageList/ChatMessageList';
import {loadMessages, postMessage, subscribeOnNewMessages} from '../../api/messageApi';
import PropTypes from 'prop-types';
import InputFieldWithSubmitButton from '../../components/InputFieldWithSubmitButton/InputFieldWithSubmitButton';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  inputFieldContainer: {
    boxSizing: 'border-box',
    padding: '1rem',
    width: '100%'
  }
}));

function Chat({userName}) {

  const classes = useStyles();
  const [messages, setMessages] = useState([]);
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

  const sendMessage = (message) => {
    postMessage({userName, message});
  };

  return (
    <div className={classes.container}>
      <ChatMessageList messages={messages}/>
      <div className={classes.inputFieldContainer}>
        <InputFieldWithSubmitButton
          id="message-field"
          label="Message"
          buttonValue="Send"
          onSubmit={sendMessage}
        />
      </div>
    </div>
  );
}


Chat.propTypes = {
  userName: PropTypes.string.isRequired
};

Chat.defaultProps = {};

export default Chat;