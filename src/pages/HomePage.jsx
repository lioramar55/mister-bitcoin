import { Component } from 'react'
import { MoveList } from '../cmps/MoveList'
import { getRate } from '../services/bitcoin.service'
export class HomePage extends Component {
  state = {
    totalBTC: 0,
  }
  async componentDidMount() {
    const { user } = this.props
    if (user) {
      const totalBTC = await getRate(user.balance)
      this.setState({ totalBTC })
    }
  }

  render() {
    const { user } = this.props
    const { totalBTC } = this.state
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
}
