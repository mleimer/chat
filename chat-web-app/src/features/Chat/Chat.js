import React, {createRef, useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {loadMessages, postMessage, subscribeOnNewMessages} from '../../api/messageApi';
import PropTypes from 'prop-types';
import InputFieldWithSubmitButton from '../../components/InputFieldWithSubmitButton/InputFieldWithSubmitButton';
import ChatMessageList from './ChatMessageList/ChatMessageList';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    height: 'calc(100vh - 2rem)',
    width: '100%'
  },
  messageListContainer: {
    flex: 1,
    height: '100%',
    overflow: 'auto'
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
  const endOfListRef = createRef();
  const stateRef = useRef();
  stateRef.current = {messages};

  // load new messages upon component mounting once setMessages dependency is present
  useEffect(() => {
    loadMessages()
      .then((response) => {
        setMessages(response.data);
      });
  }, [setMessages]);

  // subscribe on new messages when component mounts
  useEffect(() => {
    subscribeOnNewMessages((response) => {
      let newMessages = [...stateRef.current.messages, JSON.parse(response.body)];
      setMessages(newMessages);
    });
  }, []);

  // Scroll to bottom once new message is retrieved if was already scrolled to bottom
  useEffect(() => {
    if (endOfListRef) {
      const isScrolledToBottom = endOfListRef.current.getBoundingClientRect().bottom <= window.innerHeight;
      if (isScrolledToBottom) {
        endOfListRef.current.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, [endOfListRef]);

  // Scroll to bottom once all messages are loaded
  const areMessagesLoaded = messages.length > 0;
  useEffect(() => {
    if (endOfListRef) {
      endOfListRef.current.scrollIntoView({behavior: 'smooth'});
    }
    // dependencies do not contain endOfListRef as it shall only be triggered once all messages are loaded and not when endOfListRef gets updated
    // eslint-disable-next-line
  }, [areMessagesLoaded]);


  const sendMessage = (message) => {
    postMessage({userName, message});
  };

  return (
    <div className={classes.container}>
      <h1>Chat</h1>
      <div className={classes.messageListContainer}>
        <ChatMessageList messages={messages}/>
        <div ref={endOfListRef}/>
      </div>
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