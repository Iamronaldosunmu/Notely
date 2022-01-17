import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import WelcomePage from './Pages/WelcomePage';
import Dashboard from './Pages/Dashboard';
import NewNote from './Pages/NewNote';
const App : React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/signUp" component={SignUp} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/welcome" component={WelcomePage} />
        <Route path="/home" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/newNote" component={NewNote} />
      </Switch>
    </>
  );
}

export default App;
