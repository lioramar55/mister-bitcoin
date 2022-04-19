import { useEffect, useState } from 'react'

export const MoveList = (props) => {
  const [moves, setMoves] = useState(null)
  useEffect(() => {
    let { toId, moves } = props
    if (toId)
      moves = moves.filter((move) => move.toId === toId)
    else moves = moves.slice(moves.length - 3)
    setMoves(moves)
    // eslint-disable-next-line
  }, [])

  const formatTime = (time) => {
    return new Date(time).toUTCString()
  }

  const mappedMoves = () => {
    return moves.map((move) => (
      <li key={move.toId + move.at}>
        {!toId && <p>To: {move.to}</p>}
        <p>{'At: ' + formatTime(move.at)}</p>
        <p>Amount: {move.amount} coins</p>
      </li>
    ))
  }

  const { toId } = props
  if (!moves) return <div>Loading...</div>
  return (
    <div className="move-list">
      <h3>{toId ? 'All moves' : 'Last 3 moves'}</h3>
      <ul className="clean-list">
        {moves.length ? mappedMoves() : <li>No moves</li>}
      </ul>
    </div>
  )
}
