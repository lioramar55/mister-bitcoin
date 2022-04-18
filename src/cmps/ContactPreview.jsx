import { Component } from 'react'

export class ContactPreview extends Component {
  render() {
    const { contact } = this.props
    return (
      <div className="contact-preview">
        <img
          src={'https://robohash.org/' + contact.name}
          alt=""
        />
        <p>{contact.name}</p>
      </div>
    )
  }
}
