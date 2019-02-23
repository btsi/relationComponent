import React from 'react'
import axios from 'axios'

let imgStyle = {
  "textOverflow": "ellipsis",
  "width": "300px",
  "height": "200px",
  "borderRadius": "2px",
  "paddingTop": "5px"
}

let componentStyle = {
  "textOverflow": "ellipsis",
  float: "left",
  width: "50%",
  cursor: "pointer",
  border: "3px",
  margin: "auto",
}

let priceStyle = {
  "fontWeight": "bold",
}

let RelatedEntry = (props) => {
  return (
    <div style={componentStyle} onClick={() => props.selectAdventure(props.data.id, props.data.catagory)}>
      <img style={imgStyle} src={props.data.image_URL}></img>
      <div>{props.data.title}</div>
      <div style={priceStyle}>${props.data.price}</div>
      <div>Ask about our group rates!</div>
    </div >
  )
}

export default RelatedEntry