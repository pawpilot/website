import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
//import MediaDisplay from './MediaDisplay';

import styles from "../styles/Adspace.module.css";

//add placeholder image of press pilot advertisement for when there are no active renters

//import ReactPlayer from 'react-player';





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
]; // replace with the abi of the pawpool smart contract


//const contractAddress = '0x371C41a742EfE8441f50816899D42341F8C642f7'; // replace with the address of the RentalPool smart contract
//className={styles.adspace3}

const contractAddress = '0x40dC3FEd0647bC4Aa6bfa1eb73a3E5CA950fea54';

//const placeholderImage = '../public/Pepsi.jpg'; // Add your placeholder image URL hereconst placeholderVideo = '../public/dkuma.MP4'; // Add your placeholder video URL here


const PawPrint = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [pawPoolId] = useState(0);



  useEffect(() => {
    initWeb3();
  }, []);

  useEffect(() => {
    if (web3 && account) {
      loadCampaign();
    }
  }, [web3, account]);

  const initWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      try {
        await window.ethereum.enable();
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    }
  };

  const loadCampaign = async () => {
    const contractInstance = new web3.eth.Contract(abi, contractAddress);
    const campaignData = await contractInstance.methods.campaigns(pawPoolId).call();
    setCampaign(campaignData);
  };

  const isVideo = (url) => {
    const extension = url.split('.').pop();
    return ['mp4', 'webm', 'ogg'].includes(extension);
  };

  const renderMedia = () => {
    if (campaign) {
      if (isVideo(campaign.website)) {
        return (
          <video className={styles.adspace1} autoplay loop>
            <source className={styles.adspace1} src={campaign.website} type={`video/${campaign.website.split('.').pop()}`} />
            Your browser does not support the video tag.
          </video>
        );
      } else {
        return (
          <img className={styles.adspace1} src={campaign.website} alt={campaign.name} />
        );
      }
    }
  };

  return (
    <div >
      {campaign && (
        <>
          <a  href={campaign.website} target="_blank" rel="noopener noreferrer">
            {renderMedia()}
          </a>
        </>
      )}
    </div>
  );
};

export default PawPrint;
