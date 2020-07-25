import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
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
    timestamp: '2018-07-14T14:32:35+0200'
  }];

  return (
    <div className={classes.container}>

      <List className={classes.list}>
        {
          mockMessages.map(message => (
            <ListItem key={message.timestamp}>
              <ListItemText
                primary={message.content}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {message.userName}
                    </Typography>
                    {` — ${message.timestamp}`}
                  </>
                }
              />
            </ListItem>
          ))
        }
      </List>
    </div>
  )
}

export default Chat;