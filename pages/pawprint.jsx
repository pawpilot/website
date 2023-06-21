import React, { useState, useEffect } from 'react';
import PawPrint from "../components/pawprint";

import styles from "../styles/Adspace.module.css";

import { Helmet } from "react-helmet";
import "../public/animation.png";

export default function Billboard() {

  return (
    <div >
      <Helmet>
        <link rel="shortcut icon" type="image/x-icon" href="/pawprint.png" />
        <title>Paw Pilot | Leave Your Print</title>
      </Helmet>
				
      <main >
        
				<PawPrint/>
			</main>


      </div>
 );
}

