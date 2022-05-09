import React from 'react'
import ReactDOM from 'react-dom'
import SpaceX from '../SpaceX'
import { Provider } from 'react-redux'
import store from '../../../redux/store'
import renderer from 'react-test-renderer'

it('SpaceX renders without crashing',
() => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <SpaceX />
    </Provider>,
div)
})

it("matchs SpaceX snapshot",
() => {
  const tree = renderer.create(
    <Provider store={store}>
      <SpaceX />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})