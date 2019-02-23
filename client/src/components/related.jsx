import React from 'react'
import axios from 'axios'

let imgStyle = {
  "width": "300px",
  "height": "200px",
  "borderRadius": "10px",
  "paddingTop": "5px",
}

let componentStyle = {
  float: "left",
  width: "50%",
  cursor: "pointer",
  border: "3px",
  margin: "auto",
}

let titleStyle = {
  whiteSpace: "no-wrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: "10px"
}

let priceStyle = {
  "fontWeight": "bold",
}

let RelatedEntry = (props) => {
  return (
    <div style={componentStyle} onClick={() => props.selectAdventure(props.data.id, props.data.catagory)}>
      <img href="#" style={imgStyle} src={props.data.image_URL}></img>
      <div style={titleStyle}>{props.data.title}</div>
      <div style={priceStyle}>${props.data.price}</div>
      <div>Ask about our group rates!</div>
    </div >
  )
}

export default RelatedEntry