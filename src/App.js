import './App.css';
import { Button } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Button color="primary" onClick={() => console.log('działam')}>Danger!</Button>
      {/* progress bar */}
    </div>
  );
}

export default App;
