import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import { MainPage } from "./MainPage";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login } from "./Login";

function App(){
    return(
        <Router>
            <AuthProvider>
                <Switch>
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/" component={MainPage} />
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default App