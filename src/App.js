// components
import InputForm from './components/InputForm';
import CustomVideoListModal from './components/CustomVideoListModal';
import VideoList from './components/VideoList';
// styles
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="display-1">Video App</h1>
      <InputForm />
      <CustomVideoListModal />
      <VideoList />
    </div>
  );
}

export default App;
