import React from 'react';
import {render, fireEvent, cleanup, getByText, getByRole} from '@testing-library/react';
import ReactDOM from 'react-dom';
import Welcome from './components/welcome';
import App from './App';
import Main from './components/mainscreen';
import {HashRouter as Router, Route} from 'react-router-dom';

import { exportAllDeclaration } from '@babel/types';
import { async } from 'q';


// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('loads the first screen with correct button', () => {
  const {getByRole} = render(
    <Welcome></Welcome>
  )
  const welcome_button = getByRole('button')
  //console.log(getByRole('button').href)
  //console.log(welcome_button.href)
  expect(welcome_button.href).toContain("/Movies/?#/home/whatson")
});

describe('Testing the NavBar', () => {
  it('Nav text changes color when clicked or hovered',  async() => {
    const {getAllByText} = render(
      <Router>
        <Main></Main>
      </Router>
    )
    const whatson_button = getAllByText(/What's On/)
    const upcoming_button = getAllByText(/Upcoming Movies/)
    //console.log(getByRole('button').href)
    console.log(whatson_button[0].style.color)
    console.log(upcoming_button[0].style.color)
    expect(whatson_button[0].style.color).toBe("rgb(119, 119, 119)")
    fireEvent.click(upcoming_button[0])
    
    console.log(whatson_button[0].style)
    console.log(upcoming_button[0].style)
    console.log(upcoming_button[0].pendingProps)
    
    console.log(upcoming_button[0].memoizedProps)
  });


})