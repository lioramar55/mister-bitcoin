import { Component } from 'react'
import { Link } from 'react-router-dom'
import { ContactPreview } from '../cmps/ContactPreview'
import { contactService } from '../services/contact.service'
import { AppFilter } from '../cmps/AppFilter'
export class ContactList extends Component {
  state = {
    contacts: null,
    filterBy: { term: '' },
    selectedContactId: '',
  }
  async componentDidMount() {
    this.loadContacts()
  }

  loadContacts = async () => {
    const { filterBy } = this.state
    const contacts = await contactService.getContacts(
      filterBy
    )
    this.setState({ contacts })
  }

  setFilter = async (filterBy) => {
    this.setState({ filterBy }, () => this.loadContacts())
  }

  removeContact = async (id) => {
    await contactService.deleteContact(id)
    this.loadContacts()
  }

  render() {
    const { contacts } = this.state
    if (!contacts) return <div>Loading...</div>
    return (
      <div className="contact-list">
        <div className="header">
          <h1>Contact List</h1>
          <AppFilter setFilter={this.setFilter} />
          <Link
            className="simple-button"
            to="/contact/edit"
          >
            Add Contact
          </Link>
        </div>
        <ul className="contacts simple-cards-grid">
          {contacts.map((c) => (
            <li key={c._id}>
              <Link to={`/contact/${c._id}`}>
                <ContactPreview contact={c} />
              </Link>
              <button
                onClick={() => this.removeContact(c._id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
