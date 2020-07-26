import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    overflowWrap: 'break-word',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

function ChatMessageList({messages}) {
  const classes = useStyles();

  return (
    <List className={classes.list} data-testid="message-list">
      {
        messages.map((message, i, list) => (
          <div key={message.timestamp}>
            <ListItem>
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
                    {' — '}
                    <Moment format="DD.MM.YYYY HH:mm:ss">{message.timestamp}</Moment>
                  </>
                }
                data-testid="message-item"
              />
            </ListItem>
            {i + 1 < list.length && <Divider/>}
          </div>
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