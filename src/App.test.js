import App from './App';
import { Provider } from "react-redux"
import store from './redux/store'
import ReactDOM from 'react-dom'

it('App renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div)
})
