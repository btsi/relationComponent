import React from "react";
import Adventures from "../../../mockData";
import { SSL_OP_TLS_BLOCK_PADDING_BUG } from "constants";

let headerStyle = {
  display: "block",
  width: "80px",
  height: "80px",
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: "50%",
  paddingTop: "10px"
};

let hrStyle = {
  width: "60%",
  marginLeft: "auto",
  marginRight: "auto"
};

let headerText = {
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "center",
  paddingTop: "10px"
};

let getHeader = target => {
  let currentAdventure = {};

  Adventures.headers.forEach(adventure => {
    if (adventure.category === target) {
      currentAdventure = adventure;
    }
  });

  return currentAdventure.image_URL;
};

let Header = props => {
  return (
    <div>
      <img src={getHeader(props.category)} style={headerStyle} />
      <div style={headerText}>{props.category}</div>
      <hr />
    </div>
  );
};
export default Header;
