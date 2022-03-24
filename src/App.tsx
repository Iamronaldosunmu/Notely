import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, useLocation} from 'react-router-dom';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import WelcomePage from './Pages/WelcomePage';
import Dashboard from './Pages/Dashboard';
import NewNote from './Pages/NewNote';
import EditNote from './Pages/EditNote';
import ViewNote from './Pages/ViewNote';
import DesktopDashboard from './Pages/DesktopDashboard';
import LoadingScreen from './Pages/LoadingScreen';
import ViewDesktopImage from './Components/ViewDesktopImage';
const App : React.FC = () => {
  const location = useLocation();
  return (
    <>
    <AnimatePresence exitBeforeEnter>
      <AnimateSharedLayout >
        <Switch location={location} key={location.pathname}>
          <Route path="/editNote/:userId/:noteId" component={EditNote} />
          <Route path="/viewNote/:userId/:noteId" component={ViewNote} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/viewImage" component={ViewDesktopImage} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/welcome" component={WelcomePage} />
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/desktopDashboard" component={DesktopDashboard} />
          <Route path="/newNote" component={NewNote} />
          <Route path="/" component={LoadingScreen} />
        </Switch>
      </AnimateSharedLayout>
    </AnimatePresence>
    </>
  );
}

export default App;
