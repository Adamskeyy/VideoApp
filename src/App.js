// components
import InputForm from './components/InputForm';
import VideoList from './components/VideoList';
import SortBy from './components/SortBy';
// styles
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Video App</h1>
      <InputForm />
      <SortBy />
      <VideoList />
    </div>
  );
}

export default App;
