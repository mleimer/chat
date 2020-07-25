import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ChatMessageList from "./ChatMessageList/ChatMessageList";
import {loadMessages} from "../../api/messageApi";

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function Chat() {

  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages()
      .then((response) => {
        setMessages(response.data)
      });
  }, [setMessages]);

  return (
    <div className={classes.container}>
      <ChatMessageList messages={messages}/>
    </div>
  )
}

export default Chat;