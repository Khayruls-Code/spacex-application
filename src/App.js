import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { decrement, increment } from './redux/spaceXDataSlice';

function App() {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Counter No:{count} </h1>
      <button onClick={() => dispatch(increment())}>Increment By 1</button>
      <button onClick={() => dispatch(decrement())}>Decrement By 1</button>
    </div>
  );
}

export default App;
