import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
function _AppHeader(props) {
  return (
    <header>
      <div className="logo">
        <h1>MisterBitcoin</h1>
      </div>
      <nav>
        <NavLink to="/">Home Page</NavLink>
        <NavLink to="/contact">Contacts</NavLink>
        <NavLink to="/stats">Stats</NavLink>
      </nav>
    </header>
  )
}

export const AppHeader = withRouter(_AppHeader)
