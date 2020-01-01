import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { SnackbarProvider } from "notistack";

import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// Component
import Navbar from "./components/Navbar";
import NavbarBottom from "./components/NavbarBottom";
import AuthRoute from "./util/AuthRoute.js";
// pages
import Home from "./pages/Home";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import About from "./pages/About";

// theme color
const theme = createMuiTheme(themeFile);
const token = localStorage.IdToken;
let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.ex * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            <div className="App">
              {/* <Router /> */}
              <Router>
                <Navbar />
                <div className="container">
                  <Switch>
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/`}
                      component={Home}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/order`}
                      component={Order}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/cart`}
                      component={Cart}
                    />
                    <AuthRoute
                      exact
                      path={`${process.env.PUBLIC_URL}/login`}
                      component={Login}
                    />
                    <AuthRoute
                      exact
                      path={`${process.env.PUBLIC_URL}/about`}
                      component={About}
                    />
                  </Switch>
                </div>
                <NavbarBottom />
              </Router>
            </div>
          </SnackbarProvider>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
export default App;
