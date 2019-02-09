import React from 'react'
import ReactDOM from 'react-dom'
import RelatedEntry from './components/related.jsx'
import Axios from 'axios'
import data from '../../mockData' // works!

let styleSheet = {
  width: "635px",
}

class RelatedList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleClick(data) {
    //console.log('inside postData with: ', data) //works!
    Axios.get(`/photos/${data}`)
      .then(data => console.log('GET method coming back with: ', data))
  }

  postData(collection) {
    Axios.post('/photos', collection)
      .then(data => console.log('POST method coming back from db'))
  }

  render() {
    return (
      <div style={styleSheet}>
        <button onClick={() => this.postData(data.events)}>Populate Database</button>
        {data.events.map((event, i) => (
          <RelatedEntry handleClick={this.handleClick.bind(this)} key={i} data={event} />
        ))}
      </div>
    )
  }
}



ReactDOM.render(<RelatedList />, document.getElementById('relation'))