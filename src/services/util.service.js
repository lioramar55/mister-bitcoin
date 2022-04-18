function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  let val = localStorage.getItem(key)
  if (!val) return null
  return JSON.parse(val)
}

function makeId(length = 8) {
  const txt =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < length; i++) {
    id += rand(0, txt.length)
  }
  return id
}

function rand(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export default {
  makeId,
  loadFromStorage,
  saveToStorage,
}
