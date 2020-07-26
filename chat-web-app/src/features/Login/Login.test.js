import React from 'react';
import {render} from '@testing-library/react';
import Login from './Login';

const loginIdentifier = 'login';

describe('<Login/>', () => {

  test('should mount', () => {
    const connect = () => {
    };

    const {getByTestId} = render(<Login onConnect={connect}/>);

    const login = getByTestId(loginIdentifier);

    expect(login).toBeInTheDocument();
  });

});