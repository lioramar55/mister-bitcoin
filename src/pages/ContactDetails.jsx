import { Link } from 'react-router-dom'
import { getContactById } from '../store/actions/contactActions'
import { MoveList } from '../cmps/MoveList'
import { TransferFund } from '../cmps/TransferFund'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

export const ContactDetails = (props) => {
  const [contact, setContact] = useState(null)
  const params = useParams()
  useEffect(() => {
    loadContact()
    // eslint-disable-next-line
  }, [contact])
  const dispatch = useDispatch()
  const loadContact = async () => {
    const contactToSave = await dispatch(
      getContactById(params.id)
    )
    setContact(contactToSave)
  }

  const { user } = props
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
      <TransferFund
        contact={contact}
        userBalance={user.balance}
      />
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
      <MoveList moves={user.moves} toId={contact._id} />
    </div>
  )
}
// const mapStateToProps = (state) => ({
//   user: state.userModule.user,
// })
// const mapDispatchToProps = {
//   getContactById,
// }

// export const ContactDetails = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_ContactDetails)
