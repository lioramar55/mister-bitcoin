import { useEffect } from 'react'
import { contactService } from '../services/contact.service'
import { saveContact } from '../store/actions/contactActions'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from '../hooks/useForm'

export const EditContact = (props) => {
  // const [contact, setContact] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()

  const [contact, setContact, handleChange] = useForm(null)
  useEffect(() => {
    const { id } = params
    let contact = null
    if (id) {
      setCurrContact(id)
    } else {
      contact = contactService.getEmptyContact()
    }
    setContact(contact)
    // eslint-disable-next-line
  }, [contact])

  const setCurrContact = async (id) => {
    const contactToSave =
      await contactService.getContactById(id)
    setContact(contactToSave)
  }
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    await dispatch(saveContact(contact))
    props.history.push('/contact/' + contact._id)
  }

  const inputRef = (elInput) => {
    if (elInput) elInput.focus()
  }

  const { id } = params
  if (!contact) return <div>Loading...</div>
  return (
    <div className="edit-contact">
      <h2>{id ? 'Edit' : 'Add'} Contact</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            ref={inputRef}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            name="phone"
            required
          />
        </label>
        <button>Save</button>
      </form>
    </div>
  )
}

// const mapDispatchToProps = {
//   getContactById,
//   saveContact,
// }

// export const EditContact = connect(
//   undefined,
//   mapDispatchToProps
// )(_EditContact)
