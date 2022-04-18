import { Component } from 'react'
import { getRate } from '../services/bitcoin.service'
export class HomePage extends Component {
  state = {
    totalBTC: 0,
  }
  async componentDidMount() {
    const totalBTC = await getRate(this.props.user.balance)
    this.setState({ totalBTC })
  }
  render() {
    const { user } = this.props
    const { totalBTC } = this.state
    return (
      <section className="home-page">
        <h1>Hello {user.name}</h1>
        <h3>Balance: ${user.balance}</h3>
        <h3>BTC: {totalBTC}</h3>
      </section>
    )
  }
}
