import React, { Component } from 'react'
import { AppHeader } from '../cmps/AppHeader'
import { HomePage } from './HomePage'
import { ContactList } from './ContactList'
import { ContactDetails } from './ContactDetails'
import { EditContact } from './EditContact'
import { Stats } from './Stats'
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
  }

  selectContact = (selectedContactId) => {
    this.setState({ selectedContactId })
  }

  render() {
    const { user } = this.state
    return (
      <Router>
        <AppHeader />
        <div className="container">
          <main>
            <Switch>
              <Route
                path="/contact/edit/:id"
                component={EditContact}
              />
              <Route
                path="/contact/edit"
                component={EditContact}
              />
              <Route
                path="/contact/:id"
                component={ContactDetails}
              />
              <Route
                path="/contact"
                component={ContactList}
              />
              <Route path="/stats" component={Stats} />
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
