import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppHeader } from '../cmps/AppHeader'
import { HomePage } from './HomePage'
import { ContactList } from './ContactList'
import { ContactDetails } from './ContactDetails'
import { EditContact } from './EditContact'
import { Stats } from './Stats'
import { SignupPage } from './SignupPage'
import {
  loadUser,
  isUserLoggedIn,
} from '../store/actions/userActions'
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

class _BitcoinApp extends Component {
  componentDidMount() {
    this.props.loadUser()
  }

  PrivateRoute = (props) => {
    const isUserLoggedIn = this.props.isUserLoggedIn()
    if (isUserLoggedIn) return <Route {...props} />
    return <Redirect to="/signup" />
  }

  selectContact = (selectedContactId) => {
    this.setState({ selectedContactId })
  }

  render() {
    const { user } = this.props
    const { PrivateRoute } = this
    return (
      <Router>
        <AppHeader />
        <div className="container">
          <main>
            <Switch>
              <PrivateRoute
                path="/contact/edit/:id"
                component={EditContact}
              />
              <PrivateRoute
                path="/contact/edit"
                component={EditContact}
              />
              <PrivateRoute
                path="/contact/:id"
                component={ContactDetails}
              />
              <PrivateRoute
                path="/contact"
                component={ContactList}
              />
              <Route path="/stats" component={Stats} />
              <Route
                path="/signup"
                component={SignupPage}
              />
              <PrivateRoute
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

const mapStateToProps = (state) => ({
  user: state.userModule.user,
})

const mapDispatchToProps = {
  loadUser,
  isUserLoggedIn,
}

export const BitcoinApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BitcoinApp)
