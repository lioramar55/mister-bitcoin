import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AppHeader } from '../cmps/AppHeader'
import { HomePage } from './HomePage'
import { ContactList } from './ContactList'
import { AppFooter } from '../cmps/AppFooter'
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
import { useDispatch, useSelector } from 'react-redux'

export const BitcoinApp = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userModule)

  useEffect(() => {
    dispatch(loadUser())
    // eslint-disable-next-line
  }, [])

  const PrivateRoute = (props) => {
    const isLoggedIn = dispatch(isUserLoggedIn())
    if (isLoggedIn) return <Route {...props} />
    return <Redirect to="/signup" />
  }

  return (
    <section className="app">
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
                component={() => (
                  <ContactDetails user={user} />
                )}
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
        <AppFooter />
      </Router>
    </section>
  )
}

// const mapStateToProps = (state) => ({
//   user: state.userModule.user,
// })

// const mapDispatchToProps = {
//   loadUser,
//   isUserLoggedIn,
// }

// export const BitcoinApp = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_BitcoinApp)
