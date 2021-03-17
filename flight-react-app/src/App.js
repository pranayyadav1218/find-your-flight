import './App.css';
import FlightInfo from './components/FlightInfo.js';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <p>Find <i>your</i> Flight!</p>
      </div>
      <div>
        <FlightInfo></FlightInfo>
      </div>
      <div className="App-footer">
        <p>Made by Pranay Yadav using the Skyscanner API, March 2021</p>
      </div>
    </div>
    
  );
}

export default App;
