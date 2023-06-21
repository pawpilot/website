import styles from "../styles/Pilot.module.css";
//import "../public/logo.png";
import React, { useState } from 'react';
import Host from "./host";
import Advertise from "./advertise";
import styled from 'styled-components';

const ToggleButtonHost = styled.button`
gap: 0rem;
	margin-left: 5rem;
  margin-bottom: 1em;
display:inline-block;
align-items: center;
font-family: 'Just Sans';
box-shadow: 0 0 5px rgb(0, 0, 0);
cursor: pointer;
margin-right:0px;
width: 100px;
border-radius: 10px 0 0 10px;
border: none;
font-size: 1rem;
/* Add some padding and border to the inputs */
padding: 10px 10px;
//border: 1px solid #ddd;
/* Add some background-color to the inputs */
background: (#FFFFFF);/* Add some font styles to the inputs */
&.active {
  background: radial-gradient(#ffffff, #c7c7c7)}

}

/* Media queries for smaller screens */
@media (max-width: 480px) {
  
  margin-left: 0;
  margin-bottom: 1em;
  width: 80px;
  font-size: 0.8rem;
  padding: 8px 8px;
  
}
`;

const ToggleButtonAdvertise = styled.button`
gap: 0rem;
font-family: 'Just Sans';

margin-right:5px;
display:inline-block;
align-items: left;
margin-bottom: 1rem;
margin-right:0px;
width: 100px;
border-radius: 0 10px 10px 0;
border: none;
box-shadow: 0 0 5px rgb(0, 0, 0);
cursor: pointer;

font-size: 1rem;
/* Add some padding and border to the inputs */
padding: 10px 10px;
//border: 0px solid #ddd;
/* Add some background-color to the inputs */
background: (#FFFFFF);    /* Add some font styles to the inputs */
&.active {
  background: radial-gradient(#ffffff, #c7c7c7)}
}

/* Media queries for smaller screens */
@media (max-width: 480px) {
  margin-right: 0;
  margin-bottom: 1em;
  width: 80px;
  font-size: 0.8rem;
  padding: 8px 8px;
}

`;

function Pilot() {
  const [formType, setFormType] = useState('Host');



  return (

    
          <div className={styles.card} >

      <ToggleButtonHost className={formType === 'Host' ? 'active' : ''} onClick={() => setFormType('Host')}>Host</ToggleButtonHost>
      <ToggleButtonAdvertise className={formType === 'Advertise' ? 'active' : ''} onClick={() => setFormType('Advertise')}>Advertise</ToggleButtonAdvertise>
      {formType === 'Host' ? <Host /> : <Advertise />}

      <div>

  
  </div>
    </div>

  );
}

export default Pilot;