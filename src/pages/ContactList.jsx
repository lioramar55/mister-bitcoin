import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ContactPreview } from '../cmps/ContactPreview'
import { AppFilter } from '../cmps/AppFilter'
import {
  loadContacts,
  removeContact,
  setFilterBy,
} from '../store/actions/contactActions'

export const ContactList = () => {
  const { contacts } = useSelector(
    (state) => state.contactModule
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadContacts())
    // eslint-disable-next-line
  }, [])

  const onSetFilter = useCallback(async (filterBy) => {
    await dispatch(setFilterBy(filterBy))
    dispatch(loadContacts())
    // eslint-disable-next-line
  }, [])

  const onRemoveContact = async (id) => {
    dispatch(removeContact(id))
  }

  if (!contacts) return <div>Loading...</div>
  return (
    <div className="contact-list">
      <div className="header">
        <h1>Contact List</h1>
        <AppFilter setFilter={onSetFilter} />
        <Link className="simple-button" to="/contact/edit">
          Add Contact
        </Link>
      </div>
      <ul className="contacts simple-cards-grid">
        {contacts.map((c) => (
          <li key={c._id}>
            <Link to={`/contact/${c._id}`}>
              <ContactPreview contact={c} />
            </Link>
            <button onClick={() => onRemoveContact(c._id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
