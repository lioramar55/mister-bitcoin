import { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../store/actions/userActions'

class _SignupPage extends Component {
  handleSubmit = async (ev) => {
    ev.preventDefault()
    const name = ev.target.name.value
    console.log('name', name)
    await this.props.signup(name)
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="signup-page">
        <h2>Sign up</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name: <input type="text" name="name" />
          </label>
          <button>Sign up</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  signup,
}

export const SignupPage = connect(
  undefined,
  mapDispatchToProps
)(_SignupPage)
