import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import InputFieldWithSubmitButton from '../../components/InputFieldWithSubmitButton/InputFieldWithSubmitButton';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '200px'
  }
}));

function Login({onConnect}) {

  const classes = useStyles();

  const connect = (userName) => {
    onConnect(userName);
  };

  return (
    <div className={classes.container} data-testid="login">
      <h1>Chat - Login</h1>
      <InputFieldWithSubmitButton
        label="User name"
        buttonValue="Connect"
        onSubmit={connect}
      />
    </div>
  );
}

Login.propTypes = {
  onConnect: PropTypes.func.isRequired
};

Login.defaultProps = {};

export default Login;
