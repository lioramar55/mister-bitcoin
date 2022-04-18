import React, { Component } from 'react'
import { AppHeader } from '../cmps/AppHeader'
import { HomePage } from './HomePage'
import { ContactList } from './ContactList'
import { ContactDetails } from './ContactDetails'
import { Stats } from './Stats'
import { getMarketPrice } from '../services/bitcoin.service'
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { getUser } from '../services/user.service.js'
export class BitcoinApp extends Component {
  state = {
    filterBy: '',
    selectedContactId: '',
    contacts: [],
    user: getUser(),
    BTCData: null,
  }

  selectContact = (selectedContactId) => {
    this.setState({ selectedContactId })
  }

  render() {
    const { user } = this.state
    return (
      <Router>
        <div className="app">
          <AppHeader />
          <main>
            <Switch>
              <Route
                path="/contact"
                component={ContactList}
              />
              <Route
                path="/"
                component={() => <HomePage user={user} />}
              />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}
