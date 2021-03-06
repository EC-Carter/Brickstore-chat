//react
import React from 'react';
import ReactDOM from 'react-dom';

//redux
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

//react-router
import {
  BrowserRouter as Router,
  Route,Switch
} from 'react-router-dom';

//css files and misc.
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import './index.css';
import './fonts/High Tower Text Regular/HighTowerTextRegular.ttf';
//import {SocketProvider} from './contexts/SocketProvider'

//reducers
import reducer from './reducers/mainReducer'

//components
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import ChatDashboard from './components/ChatDashboard'

//utilizing session storage
const saveToSessionStorage = (reduxGlobalState) => {

  //serialization = converting js object to string
  try{
    const serializedState = JSON.stringify(reduxGlobalState);
    sessionStorage.setItem('state',serializedState);
  }
  catch(e){
    console.log(e)
  }
}

const loadFromSessionStorage = () => {

  const serializedState = sessionStorage.getItem('state');

  if(serializedState == null){
    return undefined;
  } else {
    return JSON.parse(serializedState);
  }
  
}
const persistedState = loadFromSessionStorage();
const composedEnhancer = compose(applyMiddleware(thunk))//,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

let store = createStore(reducer,persistedState,composedEnhancer);

store.subscribe(() => {
  saveToSessionStorage(store.getState());
})

ReactDOM.render(
  <React.StrictMode>
    
      <Provider store={store}>
        {/* <SocketProvider> */}
          <Router>
            <Switch>
              <Route exact path='/' component={App} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/dashboard' component={ChatDashboard} />
            </Switch>
          </Router>
        {/* </SocketProvider> */}
      </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


