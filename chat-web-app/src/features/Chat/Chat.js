import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ChatMessageList from "./ChatMessageList/ChatMessageList";
import {loadMessages} from "../../api/messageApi";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}));

function Chat() {

  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadMessages()
      .then((response) => {
        setMessages(response.data)
      });
  }, [setMessages]);

  const sendMessage = () => {
    console.log(message);
  }

  return (
    <div className={classes.container}>
      <ChatMessageList messages={messages}/>
      <form noValidate autoComplete="off">
        <TextField label="User name" value={userName} onChange={(event) => setUserName(event.target.value)}/>
        <TextField label="Message" value={message} onChange={(event) => setMessage(event.target.value)}/>
        <Button onClick={sendMessage} variant="contained" color="primary">Send</Button>
      </form>
    </div>
  )
}

export default Chat;