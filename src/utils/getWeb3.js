import Web3 from 'web3';
import LicenseToken from '../backend/build/contracts/LicenseToken.json';

const web3=new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
let contractAddress='0xF5ec194Ca2Bc07bED04FE7a6667164d692c212a1';
web3.eth.defaultAccount = web3.eth.accounts[0]
const myContract = new web3.eth.Contract(LicenseToken.abi, contractAddress, {
    from: "0x7064167411cF1af4f578A7A6F382b501c9f81369", // default from address
    gasPrice: '60000000000' // default gas price in wei, 20 gwei in this case
});
export  {myContract,web3};
