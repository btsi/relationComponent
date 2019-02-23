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

  selectAdventure(id, catagory) {
    const clickEvent = new CustomEvent('changeID', { detail: [id, catagory] });
    window.dispatchEvent(clickEvent)
    this.handleClick(id, catagory)
  }

  handleClick(id, catagory) {
    //console.log('inside postData with: ', catagory) //works!
    this.setState({ id: id })
    Axios.get(`${server}/photos/${catagory}`)
      .then(collection => {
        this.setState({ data: collection.data })
      })
      .catch(() => console.log('Error in handleClick'))

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
    this.getData()
    window.addEventListener('changeID', (event) => {
      //console.log('this is our eventID', event.detail)
      this.handleClick(event.detail[0], event.detail[1])
      this.setState({ id: event.detail[0], catagory: event.detail[1] });
    }, false);
  };


  render() {
    return (
      <div style={headerSheet}>
        <Header catagory={this.state.catagory} />
        <div href="#" style={styleSheet}>
          {/* <button onClick={() => this.postData(adventures.events)}>Populate Database</button> */} {/* creates button to postData() */}
          {this.state.data.map((event, i) => {
            if (event.id === this.state.id) { return } else {
              return <RelatedEntry selectAdventure={this.selectAdventure.bind(this)} key={i} data={event} />
            }
          })}
        </div>
      </div >
    )
  }
}



ReactDOM.render(<RelatedList />, document.getElementById('relation'))