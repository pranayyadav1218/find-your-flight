import './App.css';
import FlightSearchPage from './components/FlightSearchPage.js';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <p>Find <i>your</i> Flight!</p>
      </div>
      <div className="App-body">
        <FlightSearchPage></FlightSearchPage>
      </div>
      <div className="App-footer">
        <p><a href="https://github.com/pyadav1218/">Pranay Yadav</a> | <a href="https://reactjs.org/">ReactJS</a>, <a href="https://rapidapi.com/skyscanner/api/skyscanner-flight-search">Skyscanner API</a> | March 2021</p>
      </div>
    </div>
    
  );
}

export default App;
