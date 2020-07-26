import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import InputFieldWithSubmitButton from './InputFieldWithSubmitButton';

const formIdentifier = 'form';
const inputContainerIdentifier = 'input-container';
const inputFieldIdentifier = 'input-field';
const submitButtonIdentifier = 'submit-button';

describe('<InputFieldWithSubmitButton/>', () => {

  const setup = (submit) => {
    if (!submit) {
      submit = () => {
      };
    }

    return render(
      <InputFieldWithSubmitButton
        id="test=id"
        label="Test Label"
        buttonValue="Test Sbumit"
        onSubmit={submit}
      />
    );
  };

  test('should mount', () => {
    const {getByTestId} = setup();

    const form = getByTestId(formIdentifier);

    expect(form).toBeInTheDocument();
  });

  test('should show number of characters typed', () => {
    const {getByTestId} = setup();

    let inputContainer = getByTestId(inputContainerIdentifier);
    let inputField = getByTestId(inputFieldIdentifier);

    expect(inputContainer).toHaveTextContent('0 / 255 chars');

    fireEvent.change(inputField, {target: {value: 'MyValue'}});

    expect(inputContainer).toHaveTextContent('7 / 255 chars');
  });

  test('should not submit when value is not present upon clicking button', () => {
    const submit = jest.fn(() => {
    });

    const {getByTestId} = setup(submit);

    const inputContainer = getByTestId(inputContainerIdentifier);
    const submitButton = getByTestId(submitButtonIdentifier);

    expect(inputContainer).toBeInTheDocument();
    expect(inputContainer).not.toHaveTextContent('Please enter a value');

    fireEvent.click(submitButton);

    expect(inputContainer).toHaveTextContent('Please enter a value');
    expect(submit.mock.calls.length).toBe(0);
  });

  test('should not submit when value is not present upon key down Enter', () => {
    const submit = jest.fn(() => {
    });

    const {getByTestId} = setup(submit);

    const inputContainer = getByTestId(inputContainerIdentifier);
    const inputField = getByTestId(inputFieldIdentifier);

    expect(inputContainer).toBeInTheDocument();
    expect(inputContainer).not.toHaveTextContent('Please enter a value');

    fireEvent.keyDown(inputField, {key: 'Enter', code: 'Enter'});

    expect(inputContainer).toHaveTextContent('Please enter a value');
    expect(submit.mock.calls.length).toBe(0);
  });

  test('should submit when value is valid upon key down Enter', () => {
    const submit = jest.fn(() => {
    });

    const {getByTestId} = setup(submit);

    const inputField = getByTestId(inputFieldIdentifier);

    expect(inputField).toBeInTheDocument();

    fireEvent.change(inputField, {target: {value: 'MyValue'}});
    fireEvent.keyDown(inputField, {key: 'Enter', code: 'Enter'});

    expect(submit.mock.calls.length).toBe(1);
  });

  test('should not submit when shift is hold in addition to Enter', () => {
    const submit = jest.fn(() => {
    });

    const {getByTestId} = setup(submit);

    const inputField = getByTestId(inputFieldIdentifier);

    expect(inputField).toBeInTheDocument();

    fireEvent.change(inputField, {target: {value: 'MyValue'}});
    fireEvent.keyDown(inputField, {key: 'Enter', code: 'Enter', shiftKey: true});

    expect(submit.mock.calls.length).toBe(0);
  });

  test('should submit when value is valid upon submit button being clicked', () => {
    const submit = jest.fn(() => {
    });

    const {getByTestId} = setup(submit);

    const inputField = getByTestId(inputFieldIdentifier);
    const submitButton = getByTestId(submitButtonIdentifier);

    expect(inputField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(inputField, {target: {value: 'MyValue'}});
    fireEvent.click(submitButton);

    expect(submit.mock.calls.length).toBe(1);
  });

});