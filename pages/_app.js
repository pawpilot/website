import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
	mainnet,

} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";

const { chains, provider } = configureChains(
	[
		mainnet,
		
	],
	[publicProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "Paw Pilot",
	projectId: "free",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});



export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider 
       modalSize="compact" chains={chains}
	   theme={darkTheme({ 
		fonts:  'designer',	
		accentColor: '#081a1e',

		accentColorForeground: '#34b1cd',
		borderRadius: 'large',
		fontStack: 'system',
		overlayBlur: 'small',
	  })}
			>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
