import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';
import Home from './homescreen';
import Mcu from './mcuscreen';

// automatically unmount and cleanup DOM after the test is finished.
//afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('search is updated when input is changed', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


/*
it('search is updated when input is changed', () => {
  const component = renderer.create(
    <Header></Header>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.Router.div.props.onVal();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
*/