import './App.css';
import SpaceX from './components/SpaceX/SpaceX';
function App() {
  return (
    <div className="bg-[url('../src/images/galaxy.jpg')] bg-no-repeat bg-center bg-cover w-full h-screen fixed overflow-y-scroll py-12">
      <SpaceX />
    </div>
  );
}

export default App;
