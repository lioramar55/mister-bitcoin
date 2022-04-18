import { contactService } from '../../services/contact.service'

export function loadContacts() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().contactModule
    try {
      const contacts = await contactService.getContacts(
        filterBy
      )
      dispatch({ type: 'SET_CONTACTS', contacts })
    } catch (err) {
      console.log('err', err)
    }
  }
}

export function removeContact(contactId) {
  return async (dispatch) => {
    await contactService.deleteContact(contactId)
    dispatch({ type: 'REMOVE_CONTACT', contactId })
  }
}

export function saveContact(contactToSave) {
  return async (dispatch) => {
    const contact = await contactService.saveContact(
      contactToSave
    )
    if (contactToSave._id) {
      dispatch({ type: 'UPDATE_CONTACT', contact })
    } else {
      dispatch({ type: 'ADD_CONTACT', contact })
    }
    return Promise.resolve()
  }
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

export function getContactById(id) {
  return async () => {
    try {
      const contact = await contactService.getContactById(
        id
      )
      return contact
    } catch (err) {
      console.log('err', err)
    }
  }
}
