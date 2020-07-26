import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '200px'
  },
  userNameAndButtonContainer: {
    display: 'flex',
    alignItems: 'baseline'
  },
  userNameField: {
    marginRight: '0.5rem'
  }
}));

function Login({onConnect}) {

  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const onUserNameChange = (event) => {
    const value = event.target.value;
    setUserName(value);
    validate(value);
  };

  const validate = (userName) => {
    if (!userName) {
      setErrorMessage('Username is required');
      return false;
    } else {
      setErrorMessage(null);
      return true;
    }
  };

  const connect = (event) => {
    event.preventDefault();
    if (validate(userName)) {
      onConnect(userName);
    }
  };

  return (
    <div className={classes.container} data-testid="login">
      <h1>Chat - Login</h1>
      <form onSubmit={connect}>
        <div className={classes.userNameAndButtonContainer}>
          <TextField
            className={classes.userNameField}
            label="User name"
            error={!!errorMessage}
            helperText={errorMessage}
            inputProps={{'data-testid': 'user-name'}}
            required
            value={userName}
            onChange={onUserNameChange}
            data-testid="user-name-container"
          />
          <Button
            onClick={connect}
            variant="contained"
            color="primary"
            type="submit"
            data-testid="submit-button"
          >
            Connect
          </Button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  onConnect: PropTypes.func.isRequired
};

Login.defaultProps = {};

export default Login;
