import './style/main.scss'
import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <main>
        <h1> apple sauce </h1>
      </main>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))