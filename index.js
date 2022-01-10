const { ethers } = require('ethers')
const Web3HttpProvider = require('web3-providers-http')

// const CUSTOM_NODE = 'https://speedy-nodes-nyc.moralis.io/3f9d5c6e33cf43c73b8ee7f2/bsc/mainnet'
const CUSTOM_NODE = 'https://bsc-dataseed.binance.org/';
const PRIVATE_KEY = '50f04e5c3676482512d8ee193d4042c4188dc030653afbc54fe7c94a4061136f'    //wallet private key

const web3provider = new Web3HttpProvider(CUSTOM_NODE)
const provider = new ethers.providers.Web3Provider(web3provider)
const wallet = new ethers.Wallet(PRIVATE_KEY);
const signer = wallet.connect(provider);

const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function formatEther(wei) {
  return ethers.utils.formatEther(wei.sub(wei.mod(1e14)))
}

(async () => {
  const usdtContract = new ethers.Contract(
    USDT_ADDRESS,
    ['function balanceOf(address owner) view returns (uint balance)'],
    signer
  )
  
  console.log(`signer: ${signer}`);
  console.log(`address: ${wallet.address}`);

  while(1) {

    const bnbBalance = await provider.getBalance(wallet.address);
    const usdtBalance = await usdtContract.balanceOf(wallet.address);
    
    console.log(`BNB Balance: ${bnbBalance}`);
    console.log(`USDT Balance: ${usdtBalance}`);
    console.log(`Balance: ${formatEther(bnbBalance)} BNB, ${formatEther(usdtBalance)} USDT`);

    delay(500)
  }
})()