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
      <div style={headerText}>{props.catagory}</div>
    </div >
  )
}

export default Header