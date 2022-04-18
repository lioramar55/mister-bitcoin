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
