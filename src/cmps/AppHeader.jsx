import React from 'react'
import { NavLink } from 'react-router-dom'
export const AppHeader = (props) => {
  return (
    <header>
      <div className="main-header container">
        <div className="logo">
          <h1>
            <NavLink exact to="/">
              MisterBitcoin
            </NavLink>
          </h1>
        </div>
        <nav>
          <NavLink exact to="/">
            Home Page
          </NavLink>
          <NavLink to="/contact">Contacts</NavLink>
          <NavLink to="/stats">Stats</NavLink>
        </nav>
      </div>
    </header>
  )
}
