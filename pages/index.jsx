import styles from "../styles/Home.module.css";
import React, { useState, useRef } from 'react';
import { Helmet } from "react-helmet";

export default function Home() {
  const navigateToLaunchPad = () => {
    window.location.href = "/launchpad";
  };

  return (
    <div>
      <Helmet>
        <link rel="shortcut icon" type="image/x-icon" href="/pawpilotlogo.png" />
        <title>Paw Pilot | Metaverse Marketing</title>
        <description>UNLOCK THE MARKETING WALLET</description>
        <image>https://pawpilot.io/tipsymobile.jpg</image> 
        <url>https://pawpilot.io/</url>
      </Helmet>

      <div className={styles.home}>
        <video noControls className={styles.adspace1} width="100%" autoPlay loop playsInline>
          <source src="/pawpilot.mp4" type="video/mp4" />
          Video loading...
        </video>

        <h2>Paw Pilot Protocol</h2>
        <h3>Launch Marketing Campaigns in the Metaverse</h3>

        <div className={styles.buttoncontainer}>
          <button className={styles.submit_button} onClick={navigateToLaunchPad}>
            Launch Pad
          </button>
        </div>
      </div>
    </div>
  );
}
