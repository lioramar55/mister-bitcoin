import { Component } from 'react'
import { connect } from 'react-redux'
import { transferFunds } from '../store/actions/userActions'
class _TransferFund extends Component {
  handleSubmit = async (ev) => {
    ev.preventDefault()
    this.props.transferFunds(
      this.props.contact,
      ev.target.amount.value
    )
    ev.target.amount.value = ''
  }

  render() {
    const { contact, userBalance } = this.props
    return (
      <div className="transfer-fund">
        <h3>Transfer coins to {contact.name}</h3>
        <form onSubmit={this.handleSubmit}>
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
}

const mapDispatchToProps = {
  transferFunds,
}

export const TransferFund = connect(
  undefined,
  mapDispatchToProps
)(_TransferFund)
