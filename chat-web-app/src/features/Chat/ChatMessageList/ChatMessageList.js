import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

function ChatMessageList({messages}) {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {
        messages.map(message => (
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
  );
}

ChatMessageList.propTypes = {
  messages: PropTypes.array.isRequired
};

ChatMessageList.defaultProps = {};

export default ChatMessageList;