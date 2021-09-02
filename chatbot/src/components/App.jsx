import React from "react";
import Signup from "./Signup";
import { MainPage } from "./MainPage";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(){
    return(
        <Container>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <Route path="/signup" component={Signup} />
                            <Route path="/" component={MainPage} />
                        </Switch>
                    </AuthProvider>
                </Router>
        </Container>
    )
}

export default App