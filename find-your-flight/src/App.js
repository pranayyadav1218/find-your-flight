import './App.css';
import FlightSearchPage from './components/FlightSearchPage.js';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <p>Find <i>your</i> Flight!</p>
      </div>
      <div>
        <FlightSearchPage></FlightSearchPage>
      </div>
      <div className="App-footer">
        <p>Made by Pranay Yadav using the Skyscanner API, March 2021</p>
      </div>
    </div>
    
  );
}

export default App;
