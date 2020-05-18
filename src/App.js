import React, {useState} from 'react';
import darkTheme from "./AppTheme";
import {AuthContext} from "./components/connection/Auth";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {ThemeProvider} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from './components/basic/Footer';
import PrivateRoute from "./components/connection/PrivateRoute";
import MainContent from './components/basic/MainContent'
import SignIn from "./components/signin/SignIn";
import Profile from "./components/profile/Profile";
import Admin from "./components/admin/Admin";
import User from "./components/user/User";
import Header from "./components/basic/Header";

function App() {
  const existingTokens = JSON.parse(sessionStorage.getItem("currentUser"))
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    if(data){
      sessionStorage.setItem('currentUser', JSON.stringify(data))
    } else {
      sessionStorage.clear();
    }
    setAuthTokens(data);
  }

  return (
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={MainContent} />
                        <Route path="/sign-in" component={SignIn}/>
                        <PrivateRoute path="/my-profile" component={Profile} />
                        <PrivateRoute path="/admin" component={Admin} />
                        <PrivateRoute path="/user" component={User} />
                    </Switch>
                    <Footer/>
                </Router>
            </ThemeProvider>
        </div>
      </AuthContext.Provider>
  );
}

export default App;
