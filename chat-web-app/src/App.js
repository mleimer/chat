import React, {useState} from 'react';
import Chat from './features/Chat/Chat';
import Login from './features/Login/Login';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    width: '100%',
    maxWidth: '750px',
    marginTop: '16px'
  }
}));

function App() {

  const classes = useStyles();
  const [userName, setUserName] = useState('');

  const connect = (userName) => {
    setUserName(userName);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.content}>
        {!userName && <Login onConnect={connect}/>}
        {userName && <Chat userName={userName}/>}
      </Paper>
    </div>
  );
}

export default App;
