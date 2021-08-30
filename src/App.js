import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginSection from "./components/login/LoginSection";

import Main from "./pages/Main";

import { AuthContext } from "./context/authContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginSection />
        </Route>
        {/* <Route path="/login">
          {user ? <Redirect to="/" /> : <LoginSection />}
        </Route> */}
      </Switch>
    </Router>
  );
}
export default App;
