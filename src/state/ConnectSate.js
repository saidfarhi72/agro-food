import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";



const SignerContext = createContext({});

const useSigner = () => useContext(SignerContext);

export const SignerProvider = ({ children }) => {
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [connectedContract, setConnectedContract] = useState(false);

  let contract;


  useEffect(() => {
    if (window.ethereum) connectWallet();
    window.ethereum.on("accountsChanged", connectWallet);
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setSigner(signer);
        setAddress(address);
        console.log("connected", address);
      } else {
        throw new Error('Please install MetaMask or use an Ethereum-enabled browser.');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      // Handle the error, display a message, etc.
    } finally {
      setLoading(false);
    }
  };
  
  const connectContract = async () => {
    const Address = "0xC478992D823B6c3d51F686cAd24514b48cc3541c";
    const ABI = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "productId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "productId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "producer",
            "type": "address"
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
            "name": "origin",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "productionDetails",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "imageIpfsHash",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "ProductAdded",
        "type": "event"
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
            "name": "_origin",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_productionDetails",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_imageIpfsHash",
            "type": "string"
          }
        ],
        "name": "addProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "contractOwner",
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
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_productId",
            "type": "uint256"
          }
        ],
        "name": "getProductInfo",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "productId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "producer",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "origin",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "productionDetails",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageIpfsHash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
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
        "name": "participants",
        "outputs": [
          {
            "internalType": "string",
            "name": "participantType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "contactInfo",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isVerified",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "productCount",
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
        "name": "productToOwner",
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
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "products",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "productId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "producer",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "origin",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "productionDetails",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageIpfsHash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_participantAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_participantType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_contactInfo",
            "type": "string"
          }
        ],
        "name": "registerParticipant",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_productId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "_newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_participantAddress",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "_isVerified",
            "type": "bool"
          }
        ],
        "name": "verifyIdentity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    try {
      const connected = new ethers.Contract(Address, ABI, signer);
      setConnectedContract(connected)
      
      return null; 
    } catch (error) {
      console.error('Error connecting to contract:', error);
      return null;
    }
  }
  const verifyParticipantIdentity = async (participantAddress, isVerified) => {
    try {
      // Make the transaction to verify participant identity
      const tx = await connectedContract.verifyIdentity(participantAddress, isVerified);
      await tx.wait(); // Wait for the transaction to be mined
  
      console.log('Participant identity verified successfully!');
      // You might want to emit an event or update UI after successful verification
    } catch (error) {
      console.error('Error verifying participant identity:', error);
    }
  };
  const registerParticipant = async (participantAddress, participantType, name, contactInfo) => {
    try {
      // Make the transaction to register a participant
      const tx = await connectedContract.registerParticipant(participantAddress, participantType, name, contactInfo);
      await tx.wait(); // Wait for the transaction to be mined
  
      console.log('Participant registered successfully!');
      // You might want to emit an event or update UI after successful registration
    } catch (error) {
      console.error('Error registering participant:', error);
    }
  };
  const addProduct = async (name, origin, productionDetails, imageIpfsHash) => {
    try {
      // Make sure to convert string parameters to bytes if necessary
      // Example: const nameBytes = ethers.utils.formatBytes32String(name);
      // const originBytes = ethers.utils.formatBytes32String(origin);
      // const productionDetailsBytes = ethers.utils.formatBytes32String(productionDetails);
      // const imageIpfsHashBytes = ethers.utils.formatBytes32String(imageIpfsHash);
  
      // Make the transaction to add a product
      const tx = await connectedContract.addProduct(name, origin, productionDetails, imageIpfsHash);
      await tx.wait(); // Wait for the transaction to be mined
  
      console.log('Product added successfully!');
      // You might want to emit an event or update UI after successful addition
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const getProductsList = async () => {
    try {
      const productCount = await connectedContract.productCount();
  
      const products = [];
      for (let i = 0; i < productCount.toNumber(); i++) {
        const productInfo = await connectedContract.getProductInfo(i);
        products.push({
          productId: productInfo.productId.toNumber(),
          producer: productInfo.producer,
          name: productInfo.name,
          origin: productInfo.origin,
          productionDetails: productInfo.productionDetails,
          imageIpfsHash: productInfo.imageIpfsHash,
          timestamp: productInfo.timestamp.toNumber(),
        });
      }
  
      console.log('Products List:', products);
      return products;
    } catch (error) {
      console.error('Error getting products list:', error);
      return [];
    }
  };
  const getProductCount = async () => {
    try {
      const count = await connectedContract.productCount();
      console.log('Product Count:', count.toNumber());
      return count.toNumber(); // Return the product count
    } catch (error) {
      console.error('Error getting product count:', error);
      return null;
    }
  };  
 


  const contextValue = { signer, address, loading, connectWallet ,connectContract,contract,getProductCount,getProductsList,addProduct,registerParticipant,verifyParticipantIdentity};

  return (
    <SignerContext.Provider value={contextValue}>
      {children}
    </SignerContext.Provider>
  );
};

export default useSigner;