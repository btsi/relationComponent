import React from "react";
import ReactDOM from "react-dom";
import RelatedEntry from "./components/related.jsx";
import Header from "./components/header.jsx";
import Axios from "axios";
//import adventures from '../../mockData.js' // works!

let headerSheet = {
  width: "617px"
};

let styleSheet = {
  width: "635px"
};

class RelatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 10,
      category: "Sleek Shoes",
      cat_img: "",
      data: []
    };
  }

  selectAdventure(id, category) {
    console.log(id, category);
    const clickEvent = new CustomEvent("changeID", { detail: [id, category] });
    console.log(clickEvent);
    window.dispatchEvent(clickEvent);
    this.handleClick(id, category);
  }

  handleClick(id, category) {
    Axios.get(`/get/${category}`)
      .then(response => {
        this.setState({ id: id, data: response.data.adv });
      })
      .catch(() => console.log("Error in handleClick"));
  }

  getData() {
    Axios.get(`/get/${this.state.category}`)
      .then(response => {
        this.setState({
          data: response.data.adv,
          category: response.data.cat[0].type,
          cat_img: response.data.cat[0].image
        });
      })
      .catch(err => console.log("error coming back from DB", err));
  }

  componentDidMount() {
    this.getData();
    window.addEventListener(
      "changeID",
      event => {
        this.handleClick(event.detail[0], event.detail[1]);
        this.setState({ id: event.detail[0], category: event.detail[1] });
      },
      false
    );
  }

  render() {
    return (
      <div style={headerSheet}>
        <Header category={this.state.category} img={this.state.cat_img} />
        <div href="#" style={styleSheet}>
          {this.state.data.map((adventure, key) => {
            if (adventure.id === this.state.id) {
              return;
            } else {
              return (
                <RelatedEntry
                  selectAdventure={this.selectAdventure.bind(this)}
                  key={key}
                  data={adventure}
                  cat={this.state.category}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<RelatedList />, document.getElementById("relation"));
