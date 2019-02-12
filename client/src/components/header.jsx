import React from 'react'

let headerStyle = {
  "display": "block",
  "width": "50px",
  "height": "50px",
  "marginLeft": "auto",
  "marginRight": "auto",
}

let headerText = {
  "textAlign": "center",
  "paddingBottom": "10px"
}

let Header = (props) => {
  return (
    <div>
      <img style={headerStyle} className="header" src="https://s3.amazonaws.com/adventure-catagory/flying.jpg"></img>
      <div style={headerText}> Flying</div>
    </div >
  )
}

export default Header