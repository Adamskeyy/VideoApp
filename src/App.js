import './App.css';
import { Button, Input } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Input type="text" />
      <Button color="primary" onClick={() => console.log('działam')}>Danger!</Button>
      {/* progress bar */}
    </div>
  );
}

export default App;
