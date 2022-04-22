import React from "react";
import ReactDOM from "react-dom";

const body = document.querySelector("body");

export class ModalPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    body.appendChild(this.el);
    body.addEventListener("keydown", this.logKey);
  }

  componentWillUnmount() {
    body.removeChild(this.el);
    body.removeEventListener("keydown", this.logKey);
  }

  logKey = (e) => {
    if (e.code === 'Escape') {
        this.props.close();
    }
  };

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
