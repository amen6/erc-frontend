import React from "react";
import styles from "./loginButton.module.css";

function Button({ title }) {
  return <button className={styles.mybutton}>{title}</button>;
}

export default Button;
