import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"


const Account = () => {
  const { user, logout, isAuthenticated } = useAuth0()
  console.log('isAuthenticated: ', isAuthenticated);
  console.log('user: ', user);

  return (
    <div>
      {user.nickname === "jamesmawalker" ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>You have not made any purchases yet.</p>
      )}
      <a
        href="#logout"
        onClick={(e) => {
          logout({ returnTo: "http://localhost:8000" })
          e.preventDefault()
        }}
      >
        Log Out
      </a>
    </div>
  )
}

export default withAuthenticationRequired(Account)
