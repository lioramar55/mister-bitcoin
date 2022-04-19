import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/userActions'

export const SignupPage = (props) => {
  const dispatch = useDispatch()
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const name = ev.target.name.value
    console.log('name', name)
    await dispatch(signup(name))
    props.history.push('/')
  }

  return (
    <div className="signup-page">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" name="name" />
        </label>
        <button>Sign up</button>
      </form>
    </div>
  )
}
