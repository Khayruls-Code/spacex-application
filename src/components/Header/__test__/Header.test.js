import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../Header'
import renderer from 'react-test-renderer'


it('Header render without crashing',
() => {
  const div = document.createElement('div')
  ReactDOM.render(<Header />,
div)
})

it("matchs Header snapshot",
() => {
  const tree = renderer.create(<Header />).toJSON()
  expect(tree).toMatchSnapshot()
})