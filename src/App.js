// components
import InputForm from './components/InputForm';
import VideoList from './components/VideoList';
import FilterBar from './components/FilterBar';
// styles
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Video App</h1>
      <InputForm />
      <FilterBar />
      <VideoList />
    </div>
  );
}

export default App;
