import React from 'react';
import ChatMessageList from './ChatMessageList';
import {render} from '@testing-library/react';

const messageListIdentifier = 'message-list';
const messageItemIdentifier = 'message-item';

describe('<ChatMessageList/>', () => {

  test('should always show message list', () => {
    const messages = [];

    const {getByTestId} = render(<ChatMessageList messages={messages}/>);

    const messageList = getByTestId(messageListIdentifier);

    expect(messageList).toBeInTheDocument();
  });

  test('should show message item', () => {
    const messages = [{
      content: 'Hey Charlie',
      userName: 'Smartin',
      timestamp: '2020-07-26T04:00:03.786Z'
    }];

    const {getByTestId} = render(<ChatMessageList messages={messages}/>);

    const messageList = getByTestId(messageListIdentifier);
    const messageItem = getByTestId(messageItemIdentifier);

    expect(messageList).toBeInTheDocument();
    expect(messageItem).toBeInTheDocument();
    expect(messageItem).toHaveTextContent('Hey Charlie');
    expect(messageItem).toHaveTextContent('Smartin');
  });

});