import './App.css';
import Signup from './Components/Signup'
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';
import ResetPassword from './Components/ResetPassword';
import Profile from './Components/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './Components/Login';
import { AuthProvider } from './Context/AuthContext';
function App() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <PrivateRoute path='/' exact component={Feed}/>
          <PrivateRoute path='/profile' exact component={Profile}/>
          <Route path='/resetpassword'component={ResetPassword}/>
          <Route path='/signup' exact component={Signup} />
          <Route path='/login' exact component={Login} />
        </AuthProvider>
      </Switch>
    </Router>

  );
}

export default App;
