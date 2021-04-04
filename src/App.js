// components
import Header from './components/Header';
import InputForm from './components/InputForm';
import CustomVideoListModal from './components/CustomVideoListModal';
import VideoList from './components/VideoList';
// styles
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <InputForm />
      <CustomVideoListModal />
      <VideoList />
    </div>
  );
}

export default App;
