import ReactDOM from 'react-dom';
// application
import App from './App';
// styles
import 'bootstrap/dist/css/bootstrap.min.css';
// redux
import store from './redux/store';
import { Provider } from 'react-redux';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
