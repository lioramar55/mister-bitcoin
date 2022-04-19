import { useEffect, useState } from 'react'
import { MoveList } from '../cmps/MoveList'
import { getRate } from '../services/bitcoin.service'
export const HomePage = (props) => {
  const [totalBTC, setTotalBTC] = useState(0)
  const { user } = props
  useEffect(() => {
    if (user) {
      setRate()
    }
    // eslint-disable-next-line
  }, [totalBTC])

  const setRate = async () => {
    const rate = await getRate(user.balance)
    setTotalBTC(rate)
  }

  if (!user) return <div>Loading...</div>
  return (
    <section className="home-page">
      <h1>Welcome back, {user.name}</h1>
      <h3>Your balance: ${user.balance}</h3>
      <h3>Total in BTC: {totalBTC}</h3>
      <MoveList moves={user.moves} />
    </section>
  )
}
