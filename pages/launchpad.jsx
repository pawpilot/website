import styles from "../styles/Home.module.css";
import Pilot from "../components/pilot";
import { Helmet } from "react-helmet";
import "../public/animation.png";

import Adspace from "../components/adspace";
//import Adspace2 from "../components/adspace2";

//advertising ecosystem + future product releases

export default function Home() {
	return (

		
		<div>
			
			<Helmet>
        <link rel="shortcut icon" type="image/x-icon" href="/pawpilotlogo.png" />
        <title>Paw Pilot | Metaverse Marketing</title>
      </Helmet>

	  <header className={styles.header_container}>
				<div className={styles.logo_container}>
					<h1 className={styles.logo}></h1>
					</div>
          
					</header>

					<main className={styles.main}>
        <section className={styles.adsection1}>
          <Adspace />
        </section>
        <section>
          <Pilot />
        </section>
        <section className={styles.adsection2}>
          <Adspace />
        </section>
      </main>

			
			
			

			</div>



			

	);
}
