import { Component } from 'react'
import { contactService } from '../services/contact.service'
export class ContactDetails extends Component {
  state = {
    contact: null,
  }
  async componentDidMount() {
    const contact = await contactService.getContactById(
      this.props.id
    )
    this.setState({ contact })
  }
  render() {
    const { contact } = this.state
    if (!contact) return <div>Loading...</div>
    return (
      <div className="contact-details">
        <img
          src={'https://robohash.org/' + contact.name}
          alt=""
        />
        <h2>Name: {contact.name}</h2>
        <h2>Phone: {contact.phone}</h2>
        <h2>Email: {contact.email}</h2>
        <button
          onClick={() => this.props.gotoPage('Contacts')}
        >
          Back
        </button>
      </div>
    )
  }
}
