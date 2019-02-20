import React from 'react'
import ReactDOM from 'react-dom'
import RelatedEntry from './components/related.jsx'
import Header from './components/header.jsx'
import Axios from 'axios'
//import adventures from '../../mockData.js' // works!
let headerSheet = {
  width: "617px"
}

let styleSheet = {
  width: "635px"
}

class RelatedList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      catagory: "flying",
      data: []
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


  getData() {
    Axios.get(`/index`)
      .then(collection => {
        this.setState({ data: collection.data })
      })
      .catch(err => console.log('error coming back from DB', err))
  }

  componentDidMount() {
    this.getData()
  };


  render() {
    return (
      <div style={headerSheet}>
        <Header catagory={this.state.catagory} />
        <div style={styleSheet}>
          {/* <button onClick={() => this.postData(adventures.events)}>Populate Database</button> */}
          {this.state.data.map((event, i) => (
            <RelatedEntry handleClick={this.handleClick.bind(this)} key={i} data={event} />
          ))}
        </div>
      </div >
    )
  }
}



ReactDOM.render(<RelatedList />, document.getElementById('relation'))