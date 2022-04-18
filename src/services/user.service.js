import utilService from './util.service'
const USER_KEY = 'loggedInUser'

const getUser = () => {
  return utilService.loadFromStorage(USER_KEY)
}

const saveUser = (user) => {
  utilService.saveToStorage(USER_KEY, user)
  return Promise.resolve(user)
}

const signUp = (name) => {
  const user = {
    name,
    balance: 1000,
    moves: [],
  }
  return saveUser(user)
}

const addMove = (contact, amount) => {
  const user = getUser()
  if (user.balance < amount)
    return new Error('insufficient funds')
  let move = {
    at: Date.now(),
    toId: contact._id,
    to: contact.name,
    amount,
  }
  user.balance -= amount
  user.moves.push(move)
  return saveUser(user)
}

export default {
  getUser,
  addMove,
  signUp,
}
