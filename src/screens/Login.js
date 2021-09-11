import React, { useState } from "react";
import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import SubmitButton from "../components/SubmitButton";
import { useHistory } from "react-router";
import { ServerPath } from "../config/ServerPath";

export default function Login() {
  const history = useHistory();
  const [login, setLogin] = useState({
    username: "",
    pwd: "",
    usertype: "",
  });
  const ChangeHandler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const checkLogin = () => {
    fetch(ServerPath.Login, {
      method: "POST",
      body: JSON.stringify({
        username: login.username,
        pwd: login.pwd,
        usertype: login.usertype,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          if (login.usertype !== null && login.usertype !== "") {
            if (login.usertype === "Developer") {
              history.push({
                pathname: `/${login.usertype}/${responseJson}`,
                id: responseJson,
              });
            } else {
              history.push({
                pathname: `/${login.usertype}`,
              });
            }
          }
        } else {
          alert("Login Failed");
        }
      })
      .catch((error) => {
        console.log("fff ", error);
      });
  };
  return (
    <>
      <div class="container vertical-align">
        <div class="row justify-content-md-center">
          <div class="col-md-6">
            <div className="jumbotron">
              <h1 className="text-primary title  mb-4 text-center">LOGIN</h1>
              <form>
                <InputField
                  label="Username"
                  name="username"
                  onChange={(e) => ChangeHandler(e)}
                />
                <InputField
                  type="password"
                  label="Password"
                  name="pwd"
                  onChange={(e) => ChangeHandler(e)}
                />
                <SelectOption
                  label="User Type"
                  name="usertype"
                  onChange={(e) => ChangeHandler(e)}
                />
                <div class="mt-5 pull-right">
                  <SubmitButton value="LOGIN" onClick={() => checkLogin()} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
