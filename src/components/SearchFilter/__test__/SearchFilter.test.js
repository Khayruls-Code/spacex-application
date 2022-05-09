import React from 'react'
import ReactDOM from 'react-dom'
import SearchFilter from '../SearchFilter'
import { Provider } from 'react-redux'
import store from '../../../redux/store'
import renderer from 'react-test-renderer'


it('render without crashing',
() => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <SearchFilter />
    </Provider>,
div)
})

it("matchs snapshot",
() => {
  const tree = renderer.create(
    <Provider store={store}>
      <SearchFilter />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})