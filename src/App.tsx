import './App.css';
import { Header } from './components/Header';
import { SpaceTraders } from 'spacetraders-sdk';

const spaceTraders = new SpaceTraders()


function App() {

  const spaceInit = () => {
    spaceTraders.init('test-duck');
  }

  return (
    <>
      <Header />
      <button onClick={spaceInit}>Init</button>
    </>
  );
}

export default App;
