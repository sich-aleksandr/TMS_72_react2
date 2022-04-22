import React from "react";
import "./authorization.modules.css";
import { ModalPortal } from "../common/modal/modalPortal";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { Form } from "../common/modal/Form";

export const LoginContext = React.createContext({ });

export default class Authorization extends React.Component {
  state = {
    user: {
      login: "",
      pass: "",
      gender: "Male",
      spam: true,
    },
    genderM: true,
    isModalVisible: false,
    isformReady: false,
  };

  onHandleForm = ({ target }) => {
    const { user } = this.state;
    if (target.id === "login") {
      this.setState({ user: { ...user, login: `${target.value}` } });
    }
    if (target.id === "pass") {
      this.setState({ user: { ...user, pass: `${target.value}` } });
    }
    if (target.name === "gender") {
      this.setState({ user: { ...user, gender: `${target.value}` } });
      this.setState((prevState) => ({ genderM: !prevState.genderM }));
    }
    if (target.id === "spam") {
      this.setState({ user: { ...user, spam: !this.state.user.spam } });
    }
  };

  isFormOk = () => {
    const { login, pass } = this.state.user;
    if ( login.length > 4 && pass.length > 4 ) {
      this.modalOpenHandler();
    } else {
      this.setState({ isformReady: true });
    }
  }

  modalCloseHandler = () => {
    this.setState({ isModalVisible: false });
    this.setState({ isformReady: false });
  };

  modalOpenHandler = () => {
    this.setState({ isModalVisible: true });
  };

  render() {

    const { genderM, isModalVisible, isformReady } = this.state;
    const { login, pass, gender, spam } = this.state.user;

    const spams = spam ? 'Yes' : 'No';

    const modal = isModalVisible ? (
      <ModalPortal close = {this.modalCloseHandler}>
        <div className="modal-container">
          <div className="modal">
            <button className="btn-close" onClick={this.modalCloseHandler}>
              X
            </button>
            <div className="title"><b>Thanks for registration</b></div>
            <div className="text">Login: <b>{login}</b></div>
            <div className="text">Password: <b>{pass}</b></div>
            <div className="text">Gender: <b>{gender}</b></div>
            <div className="text">Spam? - {spams}</div>
          </div>
        </div>
      </ModalPortal>
    ) : null;

    return (
      <LoginContext.Provider value={this.state}>
      <ErrorBoundary>
        <Form onHandleForm={this.onHandleForm} isformReady={isformReady} genderM={genderM} spam={spam} isFormOk={this.isFormOk} login ={login} pass={pass} />
        {modal}
      </ErrorBoundary>
      </LoginContext.Provider>
    );
  }
}
