import React from 'react'
import ReactDOM from 'react-dom'
import RelatedEntry from './components/related.jsx'
import Header from './components/header.jsx'
import Axios from 'axios'
//import adventures from '../../mockData.js' // works!

const server = process.env.AXIOS_LOCATION || 'http://ec2-3-86-240-133.compute-1.amazonaws.com:3003'

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
      id: 10,
      catagory: "flying",
      data: []
    }
  }

  handleClick(data) {
    //console.log('inside postData with: ', data) //works!
    Axios.get(`${server}/photos/${data}`)
      .then(collection => this.setState({ data: collection.data }))
  }

  postData(collection) {
    Axios.post('/photos', collection)
      .then(data => console.log('POST method coming back from db'))
  }


  getData() {
    Axios.get(`${server}/index`)
      .then(collection => {
        this.setState({ data: collection.data })
      })
      .catch(err => console.log('error coming back from DB', err))
  }

  componentDidMount() {
    window.addEventListener('changeID', (event) => {
      //console.log('this is our eventID', event.detail)
      this.setState({ catagory: event.detail[1] });
    }, false);
    handleClick(event.detail[1])
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