import React from "react"
import './App.css';

class App extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    fetch("https://reqres.in/api/users")
      .then(res => res.json())
      .then(data => this.setState({ users: JSON.stringify(data.data) }))
  }

  render() {
    return (
      <p> {this.state.users}</p>
    )
  }
}

export default App