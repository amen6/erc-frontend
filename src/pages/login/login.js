import React, { useState } from "react";
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
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.leftSideLogin}>
          <div className={styles.leftLogoContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.02 112.03">
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    class="cls-1"
                    d="M12.84,43.33a3.79,3.79,0,0,1,3.05,1.44l25,25L52.83,81.72c2.16,2.15,4.21,2.14,6.39,0L81.67,59.23c2.2-2.2,2.19-4.25,0-6.48L59.27,30.39c-2.27-2.27-4.27-2.26-6.57,0L37.58,45.55c-2.15,2.15-4.21,2.16-6.39,0q-4-4-8-8c-2.16-2.17-2.14-4.24,0-6.4Q38.05,16.38,52.87,1.58C55-.53,57-.53,59.16,1.6l51.27,51.27c2.12,2.12,2.12,4.16,0,6.28L59.24,110.33c-2.24,2.25-4.2,2.26-6.44,0L1.71,59.26C-.57,57-.57,55,1.72,52.72,4.43,50,7.1,47.26,9.88,44.62A13.37,13.37,0,0,1,12.66,43Z"
                  />
                  <path
                    class="cls-1"
                    d="M69.73,56a8.9,8.9,0,0,1-1,1.64Q63.2,63.24,57.61,68.76c-1.1,1.1-2.07,1.12-3.16,0q-5.64-5.58-11.21-11.21c-1.12-1.13-1.06-2.07.1-3.23q5.5-5.52,11-11c1.11-1.1,2.15-1.15,3.24-.07q5.6,5.54,11.12,11.13A8.92,8.92,0,0,1,69.73,56Z"
                  />
                </g>
              </g>
            </svg>
          </div>
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
                  placeholder="Password..."
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
