import * as React from 'react';
import * as enzyme from 'enzyme';
import Title from './Title';

it('renders the correct text when no enthusiasm level is given', () => {
  const hello = enzyme.shallow(<Title text="Hello Daniel!" />);

  expect(hello.find('.title').text()).toEqual('Hello Daniel!');
});
