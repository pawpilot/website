import styles from "../styles/Pilot.module.css";
//import "./public/animation.png";
//import "../public/logo.png";
import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

// poolid 1 = paw print (the free trial), poolid 2 = paw pilot home page, poolid 3 = kuma-inu.com

const customStyles = {
    control: (provided) => ({
      ...provided,
	  width: "auto",
      margin: 'auto',
      padding: '0rem',
      borderRadius: '10px',
      border: 0,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
	  height: '10px', 
    }),
  };



const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "advertiser",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "campaignDuration",
				"type": "uint256"
			}
		],
		"name": "AdvertiserAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "advertiser",
				"type": "address"
			}
		],
		"name": "AdvertiserRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "pawPoolID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "campaignPrice",
				"type": "uint256"
			}
		],
		"name": "CampaignPriceChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "feeAddress",
				"type": "address"
			}
		],
		"name": "FeeAddressUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "feePercent",
				"type": "uint256"
			}
		],
		"name": "FeePercentUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "campaignID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pawPoolID",
				"type": "uint256"
			}
		],
		"name": "PawPoolChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			}
		],
		"name": "PoolCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "website",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "host",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "campaignPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "maxCampaigns",
				"type": "uint256"
			}
		],
		"name": "PoolCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "feePercent",
				"type": "uint256"
			}
		],
		"name": "PoolFeePercentUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "maxCampaignsPerUser",
				"type": "uint256"
			}
		],
		"name": "PoolMaxCampaignsPerUserUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "maxCampaigns",
				"type": "uint256"
			}
		],
		"name": "PoolMaxCampaignsUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "campaignPrice",
				"type": "uint256"
			}
		],
		"name": "PoolUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "UserBlacklisted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "UserWhitelisted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "acceptedTokens",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "addAcceptedToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_website",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_campaignDays",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "advertise",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "blacklist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "blacklisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "campaigns",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "pawPoolID",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "advertiser",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "website",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "campaignDuration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "campaignStart",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "campaignsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_campaignID",
				"type": "uint256"
			}
		],
		"name": "cancelCampaign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_authorized",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_isAuthorized",
				"type": "bool"
			}
		],
		"name": "changeAuthorized",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_website",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_campaignPrice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_marketingWallet",
				"type": "address"
			}
		],
		"name": "createPawPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			}
		],
		"name": "deletePawPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feeAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feePercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			}
		],
		"name": "getSupportedTokens",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_campaignID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_newPoolId",
				"type": "uint256"
			}
		],
		"name": "migrateCampaign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pawPools",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "website",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "host",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "marketingWallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "campaignPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxCampaigns",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "activeCampaigns",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxCampaignsPerUser",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "feePercent",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pawPoolsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "poolFeePercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "removeAcceptedToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_campaignID",
				"type": "uint256"
			}
		],
		"name": "removeAdvertiser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_campaignPrice",
				"type": "uint256"
			}
		],
		"name": "setCampaignPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_feeAddress",
				"type": "address"
			}
		],
		"name": "setFeeAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_feePercent",
				"type": "uint256"
			}
		],
		"name": "setFeePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_newHost",
				"type": "address"
			}
		],
		"name": "setHostAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_marketingWallet",
				"type": "address"
			}
		],
		"name": "setMarketingWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxCampaigns",
				"type": "uint256"
			}
		],
		"name": "setMaxCampaigns",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxCampaignsPerUser",
				"type": "uint256"
			}
		],
		"name": "setMaxCampaignsPerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_enabled",
				"type": "bool"
			}
		],
		"name": "setTokenPaymentsEnabled",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "supportedTokens",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenPaymentsEnabled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "updatePawPoolName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_website",
				"type": "string"
			}
		],
		"name": "updatePawPoolWebsite",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "whitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]; // replace with the abi of the pawPool smart contract

const tokenLogos = {
	ETH: {
		address: '0x0000000000000000000000000000000000000000',

	  logo: '../tokenlogos/ethlogo.png',
	},
	
	SHIB: {
	  address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
	  logo: '../tokenlogos/shibalogo.png',
	},

	LEASH: {	
	  address: '0x27C70Cd1946795B66be9d954418546998b546634',
	  logo: '../tokenlogos/leashlogo.png',
	},

	KUMA: {
	  address: '0x48C276e8d03813224bb1e55F953adB6d02FD3E02',
	  logo: '../tokenlogos/kumalogo.png',
	},

	dKuma: {
	  address: '0x3f5dd1a1538a4f9f82e543098f01f22480b0a3a8',
	  logo: '../tokenlogos/dkumalogo.png',
	},

	ELON: {
	  address: '0x761D38e5ddf6ccf6Cf7c55759d5210750B5D60F3',
	  logo: '../tokenlogos/elonlogo.png',
	},

	AKITA: {
	  address: '0x3301Ee63Fb29F863f2333Bd4466acb46CD8323E6',
	  logo: '../tokenlogos/akitalogo.png',
	},

	PawPilot: {
	  address: '0xe9246C9D4B5141ccb26A06De82B01260C36ec093',
	  logo: '../tokenlogos/elonlogo.png',
	},
	
	SOV: {
		address: '0x2c5bc2ba3614fd27fcc7022ea71d9172e2632c16',
		logo: '../tokenlogos/SOV.png',
	  },

	Karma: {
		address: '0xdfe691f37b6264a90ff507eb359c45d55037951c',
		logo: '../tokenlogos/karmadao.png',
	  },
	
};


const contractAddress = '0x40dC3FEd0647bC4Aa6bfa1eb73a3E5CA950fea54';


const Advertise = () => {
	const [pawPools, setPawPools] = useState([]);
	const [selectedPool, setSelectedPool] = useState('1');
	const [campaignDays, setCampaignDays] = useState('');
	const [website, setWebsite] = useState('');
	const [name, setName] = useState('');
	const [selectedToken, setSelectedToken] = useState('');
	const [acceptedTokens, setAcceptedTokens] = useState([]);
	const [totalPriceInWei, setTotalPriceInWei] = useState('');
	const [totalPriceInEth, setTotalPriceInEth] = useState('');
	const [success, setSuccess] = useState(false);
	const [tokenLogoUrl, setTokenLogoUrl] = useState(tokenLogos.ETH.logo);

	useEffect(() => {
		(async () => {
		  const web3 = new Web3('HTTP://127.0.0.1:7545');
		  const pawPilot = new web3.eth.Contract(abi, contractAddress);
	  
		  const poolCount = await pawPilot.methods.pawPoolsCount().call();
		  const pools = [];
	  
		  for (let i = 1; i <= poolCount; i++) {
			const pool = await pawPilot.methods.pawPools(i).call();
	  
			if (pool.host !== "0x0000000000000000000000000000000000000000") {
			  pools.push({ id: i, name: pool.name });
			}
		  }
	  
		  setPawPools(pools);
		  // Set initial form settings
		  setSelectedPool('1');
		  setCampaignDays('1');
		  setSelectedToken('ETH');
		  setTokenLogoUrl(tokenLogos.ETH.logo);
		})();
	  }, []);


	useEffect(() => {
		loadAcceptedTokens(selectedPool);
	  }, [selectedPool]);
	
	  const handlePoolChange = async (event) => {
		setSelectedPool(event.target.value);
		if (event.target.value === '1') {
		setCampaignDays('36000');
		} else {
		setCampaignDays('1');
		}
		};
		
		const loadAcceptedTokens = async (poolId) => {
		let acceptedTokens;
		if (poolId === '1') {
		acceptedTokens = Object.entries(tokenLogos).map(([symbol, token]) => ({
		address: symbol === 'ETH' ? 'ETH' : token.address,
		symbol,
		logo: token.logo,
		}));
		setCampaignDays('36000');
		} else {
		acceptedTokens = [
		{
		address: 'ETH',
		logo: tokenLogos.ETH.logo,
		},
		];
		}
		setAcceptedTokens(acceptedTokens);
		setSelectedToken('ETH');
		setTokenLogoUrl(tokenLogos.ETH.logo);
		};
		
		
	
	  const handleTokenChange = (option) => {
		setSelectedToken(option.value);
		const tokenData = Object.values(tokenLogos).find((token) => token.address === option.value);
		if (tokenData) {
		  setTokenLogoUrl(tokenData.logo);
		}
	  };
	  

	  const { ValueContainer, SingleValue } = components;

	  const CustomSingleValue = (props) => (
		<SingleValue {...props}>
		  <img src={props.data.imageUrl} alt={props.data.label} style={{ width: '30px', marginRight: '0px' }} />
		  {props.data.label}
		</SingleValue>
	  );
	  
  
//changed the token payment method to an accepted token address currency
	
	 
	  useEffect(() => {
		updateTotalPriceInWei();
	  }, [selectedPool, campaignDays]);
	
	  const updateTotalPriceInWei = async () => {
		if (selectedPool === '1') {
		setTotalPriceInWei('FREE');
		setTotalPriceInEth('FREE');
		return;
		}
	  
		const web3 = new Web3('HTTP://127.0.0.1:7545');
		const pawPilot = new web3.eth.Contract(abi, contractAddress);
		const pool = await pawPilot.methods.pawPools(selectedPool).call();
		const totalPrice = new BigNumber(campaignDays).multipliedBy(pool.campaignPrice);
	  
		if (totalPrice.isNaN()) {
		  setTotalPriceInWei('0');
		  setTotalPriceInEth('0');
		  return;
		}
	  
		const etherToWeiConversion = new BigNumber('1e18');
		const totalPriceInWei = totalPrice.multipliedBy(etherToWeiConversion);
		setTotalPriceInWei(totalPriceInWei.toFixed()); // Use toFixed() to avoid scientific notation
		setTotalPriceInEth(totalPrice.dividedBy(etherToWeiConversion).toFixed()); // Use toFixed() to avoid scientific notation
	  };
	  
	  
	  
	  const provider = window.ethereum;
	  //transaction to the advertise function
	  const handleSubmit = async (event) => {
		event.preventDefault();
	  
		if (typeof window.ethereum === 'undefined') {
		  console.error('No Ethereum provider found.');
		  return;
		}
	  
		const web3 = new Web3(provider);
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		const account = accounts[0];
		const pawPilot = new web3.eth.Contract(abi, contractAddress);
	  
		let weiTotalPrice = '0';
		if (totalPriceInEth !== 'FREE') {
		  weiTotalPrice = web3.utils.toWei(totalPriceInEth, 'ether');
		}
	  
		try {
		  const gasPrice = await web3.eth.getGasPrice();
		  const tokenAddress = "ETH" ? "0x0000000000000000000000000000000000000000" : selectedToken;
	  
		  // Estimate gas required for the transaction
		  const estimatedGas = await pawPilot.methods.advertise(selectedPool, website, name, campaignDays, tokenAddress).estimateGas({ from: account, value: weiTotalPrice });
	  
		  const receipt = await pawPilot.methods
			.advertise(selectedPool, website, name, campaignDays, tokenAddress)
			.send({ from: account, value: weiTotalPrice, gasPrice, gas: estimatedGas });
	  
		  console.log('Transaction receipt:', receipt);
		  console.log('Transaction hash:', receipt.transactionHash);
	  
		  setSuccess(true);
		  setName('');
		  setWebsite('');
		  setCampaignDays('1');
		  setSelectedToken('ETH');
	  
		} catch (error) {
		  console.error('Error submitting the form:', error);
		}
	  };
  
  

  return (
    <div >
       <form className={styles.card_form} onSubmit={handleSubmit}>
		
	   <select 
	   
	   className={styles.card_input} id="pool" onChange={handlePoolChange} value={selectedPool}>
          {pawPools.map((pool) => (
            <option key={pool.id} value={pool.id}>
              {pool.name}
            </option>
          ))}
        </select >


          <input className={styles.card_input} placeholder={"Name"} type="text" value={name} onChange={(event) => setName(event.target.value)} />

          <input className={styles.card_input} placeholder={"Link to Commercial"} type="text" value={website} onChange={(event) => setWebsite(event.target.value)} />


	
		  <select className={styles.card_input} value={campaignDays}  onChange={(event) => setCampaignDays(event.target.value)}>
  {selectedPool === '1' ? (
    <option value="36000">FOREVER</option>
  ) : (
    <>
	
      <option className="select_box"  value="1">
        1 Day
      </option>
      <option value="3">3 Days</option>
      <option value="7">7 Days</option>
      <option value="14">14 Days</option>
      <option value="30">30 Days</option>
    </>
  )}
</select>



	<div className={styles.totalamount}>

    <p step="0.0001">{totalPriceInEth}</p>


	<Select className={styles.totalamount}
          menuPlacement="auto"
          menuPosition="relative"
          margin=".5rem"
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            ValueContainer: (props) => <ValueContainer {...props}>{props.children}</ValueContainer>,
            SingleValue: CustomSingleValue,
          }}
          styles={customStyles}
          options={acceptedTokens.map((token) => ({
            value: token.address,
            imageUrl: token.logo,
          }))}
          value={{
            value: selectedToken,
            imageUrl: acceptedTokens.find((token) => token.address === 'ETH')?.logo,
          }}
          onChange={(option) => handleTokenChange(option)}
          formatOptionLabel={(option) => (
            <div>
              <img src={option.imageUrl} alt={option.label} style={{ width: '35px', marginRight: '0px' }} />
              {option.label}
            </div>
          )}
        />
      </div>

      <button className={styles.submit_button} type="submit">Launch Campaign</button>
    </form>

	  {success && (
        <div className={styles.successmessage}>
          Your campaign has been submitted successfully!
        </div>
      )}
    </div>

  );
}


export default Advertise;