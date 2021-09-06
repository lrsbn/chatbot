import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ useLogin, component: Component, ...rest }) {

  const { currentUser } = useAuth()
   // var userIsLoggedInAndVerified = currentUser ? currentUser.emailVerified : false

  return (
        <Route {...rest} render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/signup" />
        }}
        />
  )
}