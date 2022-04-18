import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { connect } from 'react-redux'
import {
  getContactById,
  saveContact,
} from '../store/actions/contactActions'

class _EditContact extends Component {
  state = { contact: null }

  async componentDidMount() {
    const { id } = this.props.match.params
    let contact = null
    if (id) {
      contact = await contactService.getContactById(id)
    } else {
      contact = contactService.getEmptyContact()
    }
    this.setState({ contact })
  }

  handleSubmit = async (ev) => {
    ev.preventDefault()
    const contact = JSON.parse(
      JSON.stringify(this.state.contact)
    )
    // try {
    //   await contactService.saveContact(contact)
    //   this.props.history.push('/contact')
    // } catch (err) {
    //   console.log('err', err)
    // }
    await this.props.saveContact(contact)
    this.props.history.push('/contact/' + contact._id)
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value =
      target.type === 'number'
        ? +target.value || ''
        : target.value
    this.setState(({ contact }) => ({
      contact: { ...contact, [field]: value },
    }))
  }

  inputRef = (elInput) => {
    if (elInput) elInput.focus()
  }

  render() {
    const { id } = this.props.match.params
    const { contact } = this.state
    if (!contact) return <div>Loading...</div>
    return (
      <div className="edit-contact">
        <h2>{id ? 'Edit' : 'Add'} Contact</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              ref={this.inputRef}
              onChange={this.handleChange}
              value={contact.name}
              type="text"
              name="name"
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              onChange={this.handleChange}
              value={contact.email}
              name="email"
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              value={contact.phone}
              onChange={this.handleChange}
              name="phone"
              required
            />
          </label>
          <button>Save</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ selectedContact }) => ({
  contact: selectedContact,
})

const mapDispatchToProps = {
  getContactById,
  saveContact,
}

export const EditContact = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EditContact)
