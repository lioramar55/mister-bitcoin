import userService from '../../services/user.service'

export function signup(name) {
  return async (dispatch) => {
    const user = await userService.signUp(name)
    dispatch({ type: 'SET_USER', user })
    return Promise.resolve()
  }
}
export function loadUser() {
  return async (dispatch) => {
    const user = await userService.getUser()
    if (user) {
      dispatch({ type: 'SET_USER', user })
      return user
    } else return null
  }
}
export function isUserLoggedIn() {
  return () => userService.getUser()
}

export function transferFunds(contact, amount) {
  return async (dispatch) => {
    try {
      const user = await userService.addMove(
        contact,
        amount
      )
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('err', err)
    }
  }
}
