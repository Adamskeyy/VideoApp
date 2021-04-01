// import React from 'react';
import ReactDOM from 'react-dom';
// application
import App from './App';
// styles
import 'bootstrap/dist/css/bootstrap.min.css';
// redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
// reducers
import videoAppReducer from './store/reducers/videoApp';

const rootReducer = combineReducers({
  videoApp: videoAppReducer,
});

const store = createStore(rootReducer);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
