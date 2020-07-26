import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Login from './Login';

const loginIdentifier = 'login';
const userNameContainerIdentifier = 'user-name-container';
const userNameIdentifier = 'user-name';
const submitButtonIdentifier = 'submit-button';

describe('<Login/>', () => {

  test('should mount with input field', () => {
    const connect = () => {
    };

    const {getByTestId} = render(<Login onConnect={connect}/>);

    const messageList = getByTestId(loginIdentifier);
    const userNameContainer = getByTestId(userNameContainerIdentifier);

    expect(messageList).toBeInTheDocument();
    expect(userNameContainer).toBeInTheDocument();
  });

  test('should not connect but show error when no username is entered', () => {
    const connect = jest.fn(() => {
    });

    const {getByTestId} = render(<Login onConnect={connect}/>);

    let userNameContainer = getByTestId(userNameContainerIdentifier);
    const submitButton = getByTestId(submitButtonIdentifier);

    expect(userNameContainer).toBeInTheDocument();
    expect(userNameContainer).not.toHaveTextContent('Username is required');

    fireEvent.click(submitButton);

    userNameContainer = getByTestId(userNameContainerIdentifier);
    expect(userNameContainer).toHaveTextContent('Username is required');
    expect(connect.mock.calls.length).toBe(0);
  });

  test('should connect when username is valid', () => {
    const connect = jest.fn(() => {
    });

    const {getByTestId} = render(<Login onConnect={connect}/>);

    const userName = getByTestId(userNameIdentifier);
    const submitButton = getByTestId(submitButtonIdentifier);

    expect(userName).toBeInTheDocument();

    fireEvent.change(userName, {target: {value: 'MyUserName'}});
    fireEvent.click(submitButton);

    const userNameContainer = getByTestId(userNameContainerIdentifier);
    expect(userNameContainer).not.toHaveTextContent('Username is required');
    expect(connect.mock.calls.length).toBe(1);
  });

});