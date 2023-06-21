import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";




export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<div className={styles.columnlogo}>

			<a href="/" target={""}>
				<img
					className={styles.logo}
					src="/logo.png"
				></img>
			</a>
</div>

<div className={styles.columnmenu}>

			<ul >
			<li className={styles.menu}>
		  <a href="/launchpad">Launch Pad</a>
		  </li>
		 
		  <li className={styles.menu}>
          <a href="/pawprint">Paw Print</a>
		  </li> 
		  <li className={styles.menu}>
          <a href="https://github.com/pawpilot">Docs</a>
		  </li> 
		  </ul>
		  </div>

		  <div className={styles.columnconnect}>

			<ConnectButton></ConnectButton>
			</div>

		</nav>

		
	);
}
