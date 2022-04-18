import { Component } from 'react'

export class AppFilter extends Component {
  state = {
    term: '',
  }
  handleChange = ({ target }) => {
    const { name } = target
    const term =
      target.type === 'number'
        ? +target.value || ''
        : target.value
    this.setState({ [name]: term }, () =>
      this.props.setFilter(this.state)
    )
  }
  render() {
    return (
      <section className="app-filter">
        <input
          type="text"
          onChange={this.handleChange}
          name="term"
          placeholder="Search"
        />
      </section>
    )
  }
}
