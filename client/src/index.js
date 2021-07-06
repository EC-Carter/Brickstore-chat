//react
import React from 'react';
import ReactDOM from 'react-dom';

//redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';

//react-router
import {
  BrowserRouter as Router,
  Route,Switch
} from 'react-router-dom';

//css files and misc.
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'
import './index.css';
import './fonts/High Tower Text Regular/HighTowerTextRegular.ttf'

//reducers
import reducer from './reducers/mainReducer'

//components
import App from './App';
import Login from './components/Login';
import Register from './components/Register'

let store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


