import { useDispatch } from 'react-redux'
import { transferFunds } from '../store/actions/userActions'

export const TransferFund = (props) => {
  const dispatch = useDispatch()

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    await dispatch(
      transferFunds(props.contact, ev.target.amount.value)
    )
    ev.target.amount.value = ''
  }

  const { contact, userBalance } = props
  return (
    <div className="transfer-fund">
      <h3>Transfer coins to {contact.name}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:${userBalance}
          <input
            type="number"
            min="0"
            max={userBalance}
            name="amount"
            required
          />
        </label>
        <button>Transfer</button>
      </form>
    </div>
  )
}

// const mapDispatchToProps = {
//   transferFunds,
// }

// export const TransferFund = connect(
//   undefined,
//   mapDispatchToProps
// )(_TransferFund)
