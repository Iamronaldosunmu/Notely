import React, {useState} from 'react';
import './App.css';
import {Route, Switch, useLocation} from 'react-router-dom';
import { AnimatePresence} from 'framer-motion';
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
import SharedNote from './Pages/SharedNote';
const App : React.FC = () => {
  const location = useLocation();
  const [numberOfRenders, setNumberOfRenders] = useState<number>(1);
  const isFirstTime = numberOfRenders === 1;
  return (
    <>
        <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route path="/editNote/:userId/:noteId" component={EditNote} />
              <Route path="/viewNote/:userId/:noteId" component={ViewNote} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/viewImage" component={ViewDesktopImage} />
              <Route path="/signIn" component={SignIn} />
              <Route path="/welcome" component={WelcomePage} />
              <Route path="/home" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/desktopDashboard" render={() => <DesktopDashboard setNumberOfRenders={setNumberOfRenders} isFirstTime={isFirstTime}/>} />
              <Route path="/newNote" component={NewNote} />
              <Route path="/sharedNote/:noteId" component={SharedNote} />
              <Route path="/" component={LoadingScreen} />
            </Switch>
        </AnimatePresence>
    </>
  );
}

export default App;
