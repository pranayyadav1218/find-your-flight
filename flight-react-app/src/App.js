import './App.css';
import FlightInfo from './components/FlightInfo.js';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        Find a flight!
      </div>
      <div>
        <FlightInfo></FlightInfo>
      </div>
    </div>
    
  );
}

export default App;
