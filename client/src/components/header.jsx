import React from 'react'
import Adventures from '../../../mockData'

let headerStyle = {
  "display": "block",
  "width": "80px",
  "height": "80px",
  "marginLeft": "auto",
  "marginRight": "auto",
}

let headerText = {
  "fontSize": "18px",
  "fontWeight": "bold",
  "textAlign": "center",
  "paddingBottom": "10px"
}

let getHeader = (target) => {
  let currentAdventure = {}

  Adventures.headers.forEach(adventure => {
    if (adventure.catagory === target) {
      currentAdventure = adventure
    }
  })

  return currentAdventure.image_URL

}

let Header = (props) => {
  return (
    <div>
      <img src={getHeader(props.catagory)} style={headerStyle}></img>
      <div style={headerText}>{props.catagory}</div>
    </div >
  )
}
export default Header