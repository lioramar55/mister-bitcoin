import { Component } from 'react'
import { ContactPreview } from '../cmps/ContactPreview'
import { contactService } from '../services/contact.service'

export class ContactList extends Component {
  state = {
    contacts: null,
    setFilter: { term: '' },
    selectedContactId: '',
  }
  async componentDidMount() {
    const contacts = await contactService.getContacts()
    // const BTCData = await getMarketPrice()
    // this.setState({ contacts, BTCData })
    this.setState({ contacts })
  }

  setFilter = async (ev) => {
    console.log('ev.target.name', ev.target.name)
    const filterBy = { term: ev.target.name }
    const contacts = await contactService.getContacts(
      filterBy
    )
    this.setState({ contacts })
  }

  render() {
    const { contacts } = this.state
    if (!contacts) return <div>Loading...</div>
    return (
      <div className="contact-list">
        <h1>Contact List</h1>
        <input
          type="text"
          onChange={this.setFilter}
          placeholder="Search"
        />
        <ul className="contacts">
          {contacts.map((c) => (
            <li
              key={c._id}
              onClick={() =>
                this.setState({ selectedContactId: c._id })
              }
            >
              <ContactPreview contact={c} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
