import React from 'react';
import logo from './logo.svg';
import Login from './Login';
import './App.css';
import Home from './Home';
import Register from './Register';
import Users from './Users';
import TransactionHistory from './TransactionHistory';
import{
  BrowserRouter,
  Switch,
  Route,
  Link
}
from 'react-router-dom';

class App extends React.Component {
  render(){
  return (
   <div className="App">
    <BrowserRouter>
      <div>
        {/* <Link to="/">Login</Link> */}
        <Link to="/register">Register</Link>
        <Link to="/users">Users</Link>
        
        <Link to="/">Logout</Link>
      </div>
      <div>
        <Switch>
          <Route path="/" exact={true}>
              <Login />
          </Route>
          <Route path="/home">
              <Home />
          </Route>
          <Route path="/register">
              <Register />
          </Route>
          <Route path="/history">
              <TransactionHistory />
          </Route>
          <Route path="/users">
              <Users />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
   </div>
  );
}
}
export default App;
