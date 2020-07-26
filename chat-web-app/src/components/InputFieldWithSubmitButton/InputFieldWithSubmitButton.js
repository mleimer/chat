import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const MAX_LENGTH = 255;
const INITIAL_HELPER_TEXT_STATE = `0 / ${MAX_LENGTH} chars`;

const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    alignItems: 'baseline',
    width: '100%'
  },
  inputField: {
    marginRight: '0.5rem',
    width: '100%'
  }
}));


function InputFieldWithSubmitButton({id, label, buttonValue, onSubmit}) {

  const classes = useStyles();
  const [value, setValue] = useState('');
  const [hasError, setError] = useState(false);

  const [helperText, setHelperText] = useState(INITIAL_HELPER_TEXT_STATE);

  const validate = (value) => {
    setHelperText(`${value.length} /  ${MAX_LENGTH} chars`);
    if (!value) {
      setHelperText('Please enter a value');
      setError(true);
      return false;
    } else if (value.length > 255) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const changeValue = (event) => {
    const value = event.target.value;
    setValue(value);
    validate(value);
  };

  const submitValue = (event) => {
    event.preventDefault();
    if (validate(value)) {
      onSubmit(value);
      setValue('');
      setHelperText(INITIAL_HELPER_TEXT_STATE);
    }
  };

  const submitIfStandaloneEnter = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      submitValue(event);
    }
  };

  return (
    <form
      className={classes.formContainer}
      data-testid="form"
      autoComplete="off"
      onSubmit={submitValue}
    >
      <TextField
        className={classes.inputField}
        error={hasError}
        helperText={helperText}
        id={id}
        inputProps={{'data-testid': 'input-field'}}
        label={label}
        multiline
        rows={1}
        rowsMax={4}
        value={value}
        onKeyDown={submitIfStandaloneEnter}
        onChange={changeValue}
        data-testid="input-container"
      />
      <Button
        onClick={submitValue}
        variant="contained"
        color="primary"
        type="submit"
        data-testid="submit-button"
      >
        {buttonValue}
      </Button>
    </form>
  );
}


InputFieldWithSubmitButton.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  buttonValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

InputFieldWithSubmitButton.defaultProps = {};

export default InputFieldWithSubmitButton;