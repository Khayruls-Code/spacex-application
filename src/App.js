import './App.css';
import Header from './components/Header/Header';
import SpaceX from './components/SpaceX/SpaceX';
function App() {
  return (
    <div className="bg-[url('../src/images/galaxy.jpg')] bg-no-repeat bg-center bg-cover w-full h-screen fixed overflow-y-scroll pb-12">
      <Header />
      <SpaceX />
    </div>
  );
}

export default App;
