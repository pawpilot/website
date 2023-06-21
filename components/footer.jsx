import {React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../styles/Footer.module.css";


import {
    faMedium,
    faTelegram,
   // faDiscord,
    faTwitter,
    faEthereum,
    faGithub
  } from "@fortawesome/free-brands-svg-icons";

/*  <a href="/"
        className={styles.discord}>
        <FontAwesomeIcon icon={faDiscord} size="2x" />
      </a>*/


export default function Footer() {



  return (



      <footer 
      className={styles.icons}>

      <div className={styles.socialcontainers}>

      <a href="https://t.me/pawpilot"
        className={styles.telegram}>
        <FontAwesomeIcon icon={faTelegram} size="2x" />
      </a>

      <a href="https://twitter.com/pawprotocol" className={styles.twitter}>
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>

      <a href="https://medium.com/@pawprotocol"
        className={styles.medium}>
        <FontAwesomeIcon icon={faMedium} size="2x" />
      </a>

      <a href="https://github.com/pawpilot"
        className={styles.github}>
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
   
      <a href="https://etherscan.io/"
        className={styles.github}>
        <FontAwesomeIcon icon={faEthereum} size="2x" />
      </a>
      </div>
</footer>



  );
}
