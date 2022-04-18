import { Component } from 'react'
import { Link } from 'react-router-dom'
import { getContactById } from '../store/actions/contactActions'
import { connect } from 'react-redux'
class _ContactDetails extends Component {
  state = {
    contact: null,
  }

  async componentDidMount() {
    // const contact = await contactService.getContactById(
    //   this.props.match.params.id
    // )
    const contact = await this.props.getContactById(
      this.props.match.params.id
    )
    this.setState({ contact })
  }

  render() {
    const { contact } = this.state
    console.log('this.props', this.props)
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
        <div className="btn-section">
          <Link to="/contact" className="simple-button">
            Back
          </Link>
          <Link
            to={`/contact/edit/${contact._id}`}
            className="simple-button"
          >
            Edit
          </Link>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getContactById,
}

export const ContactDetails = connect(
  undefined,
  mapDispatchToProps
)(_ContactDetails)
