import React from 'react'
import ReactDOM from 'react-dom'
import RelatedEntry from './components/related.jsx'
import data from '../../mockData' // works!

let styleSheet = {
  width: "635px",
}

let RelatedList = () => (
  <div style={styleSheet}>
    {data.events.map((event, i) => (
      <RelatedEntry key={i} data={event} />
    ))}
  </div>
)




ReactDOM.render(<RelatedList />, document.getElementById('relation'))