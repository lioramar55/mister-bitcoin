import { Component } from 'react'
import { connect } from 'react-redux'
import { getContactById } from '../store/actions/contactActions'

class _MoveList extends Component {
  state = {
    moves: null,
  }
  componentDidMount() {
    let { toId, moves } = this.props
    if (toId)
      moves = moves.filter((move) => move.toId === toId)
    else moves = moves.slice(moves.length - 3)
    this.setState({ moves })
  }
  formatTime = (time) => {
    return new Date(time).toUTCString()
  }

  render() {
    const { toId } = this.props
    const { moves } = this.state
    if (!moves) return <div>Loading...</div>
    return (
      <div className="move-list">
        <h3>{toId ? 'All moves' : 'Last 3 moves'}</h3>
        <ul className="clean-list">
          {moves.map((move) => (
            <li key={move.toId + move.at}>
              {!toId && <p>To: {move.to}</p>}
              <p>{'At: ' + this.formatTime(move.at)}</p>
              <p>Amount: {move.amount} coins</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getContactById,
}

export const MoveList = connect(
  undefined,
  mapDispatchToProps
)(_MoveList)
