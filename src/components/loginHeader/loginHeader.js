import React from "react";
import styles from "./loginHeader.module.css";
function Heading(props) {
  return (
    <>
      <div className={styles.heading}>
        <h4 className={styles.headingMain}>{props.title}</h4>
        <p className={styles.headingText}>{props.description}</p>
      </div>
    </>
  );
}

export default Heading;
