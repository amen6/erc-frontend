import React, { useState } from "react";
import LoginLogo from "../../images/erclogo.jpg";
import styles from "./login.module.css";
import InputField from "../../components/loginInput/loginInput";
import Button from "../../components/loginButton/loginButton";
import Heading from "../../components/loginHeader/loginHeader";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import { toast } from "react-hot-toast";

function Login() {
  const [NickName, setNickName] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}paramedic/login`, {
        nick_name: NickName,
        password: Password,
      })
      .then((response) => {
        console.log(response);
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            nickName: response.data.nick_name,
            isAdmin: response.data.super,
          },
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.leftSideLogin}>
          <img src={LoginLogo} alt="logo" />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideLogin}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
              <div className={styles.loginInputs}>
                <Heading
                  title="Log In"
                  description="Enter your credentials to access your account"
                />
                <InputField
                  label="Nick Name"
                  placeholder="Nickname..."
                  type="text"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setNickName(e.target.value);
                  }}
                />
                <InputField
                  label="Password"
                  placeholder="password"
                  type="password"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setPassword(e.target.value);
                  }}
                />
                <Button title="Sign In" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
