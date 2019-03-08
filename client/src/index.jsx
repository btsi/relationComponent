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
      cat_id: Math.floor(Math.random() * 374 + 1),
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
    this.setState({ id: id }, () => this.get());
  }

  get() {
    Axios.get(`/adventures/${this.state.cat_id}`)
      .then(response => {
        console.log(response.data.category);

        this.setState({
          data: response.data.adventures,
          category: response.data.category.type,
          cat_img: response.data.category.cat_image,
          cat_id: response.data.category.cat_id
        });
      })
      .catch(err => console.log("error coming back from DB", err));
  }

  componentDidMount() {
    this.get();
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
          {this.state.data.slice(0, 50).map((adventure, key) => {
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
