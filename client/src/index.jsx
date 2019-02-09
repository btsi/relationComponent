import React from 'react'
import ReactDOM from 'react-dom'
import RelatedEntry from './components/related.jsx'
import Axios from 'axios'
import adventures from '../../mockData.js' // works!

let styleSheet = {
  width: "635px",
}

class RelatedList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: adventures.events
    }
  }

  handleClick(data) {
    //console.log('inside postData with: ', data) //works!
    Axios.get(`/photos/${data}`)
      .then(collection => this.setState({ data: collection.data }))
  }

  postData(collection) {
    Axios.post('/photos', collection)
      .then(data => console.log('POST method coming back from db'))
  }

  render() {
    return (
      <div style={styleSheet}>
        {/* <button onClick={() => this.postData(adventures.events)}>Populate Database</button> */}
        {this.state.data.map((event, i) => (
          <RelatedEntry handleClick={this.handleClick.bind(this)} key={i} data={event} />
        ))}
      </div>
    )
  }
}



ReactDOM.render(<RelatedList />, document.getElementById('relation'))