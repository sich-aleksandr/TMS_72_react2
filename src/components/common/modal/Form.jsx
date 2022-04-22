import React from "react";
import PropTypes from "prop-types";
import {LoginContext} from '../../authorization/Authorization' 
import "../../authorization/authorization.modules.css";

export const Form = ({
  onHandleForm,
  isformReady,
  genderM,
  spam,
  isFormOk,
  login,
  pass,
}) => {
  console.log(login.length);
  return (
    
    <div>
        {/* <LoginContext.Consumer>
            <span>{this.user}</span>
        </LoginContext.Consumer> */}
      <form>
        <input type="" placeholder="Login" id="login" onChange={onHandleForm} />
        {login.length < 4 && isformReady && (
          <span className="red">Минимальная длинна поля 5 символов</span>
        )}
        <input
          type=""
          placeholder="Password"
          id="pass"
          onChange={onHandleForm}
        />
        {pass.length < 4 && isformReady && (
          <span className="red">Минимальная длинна поля 5 символов</span>
        )}
        <div>
          <input
            type="radio"
            id="Male"
            name="gender"
            checked={genderM}
            value="Male"
            onChange={onHandleForm}
          />
          <label htmlFor="Male">Male</label>

          <input
            type="radio"
            id="Female"
            name="gender"
            value="Female"
            onChange={onHandleForm}
          />
          <label htmlFor="Female">Female</label>
          <div>
            <input
              type="checkbox"
              id="spam"
              name="spam"
              checked={spam}
              onChange={onHandleForm}
            />
            <label htmlFor="spam">Do you need some spam?</label>
          </div>
          <button type="button" onClick={isFormOk}>
            Registration
          </button>
        </div>
      </form>
    </div>

  );
};

Form.propTypes = {
    onHandleForm: PropTypes.func,
    isformReady: PropTypes.bool,
    genderM: PropTypes.bool,
    spam: PropTypes.bool,
    isFormOk: PropTypes.func,
    login: PropTypes.string,
    pass: PropTypes.string,
  };
