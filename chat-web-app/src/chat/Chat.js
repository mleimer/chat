import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ChatMessageList from "./ChatMessageList/ChatMessageList";

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function Chat() {

  const classes = useStyles();

  const mockMessages = [{
    content: 'Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you? Hey, how are you?',
    userName: 'Smartin',
    timestamp: '2018-07-14T14:31:30+0200'
  }, {
    content: 'I am fine, and you?',
    userName: 'Chris',
    timestamp: '2018-07-14T14:32:35+0200'
  }, {
    content: 'I am fine, and you?',
    userName: 'Chris',
    timestamp: '2018-07-14T14:32:37+0200'
  }];

  return (
    <div className={classes.container}>
      <ChatMessageList messages={mockMessages}/>
    </div>
  )
}

export default Chat;