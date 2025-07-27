
import './App.css';
import { createPublicClient, http, createWalletClient, custom, encodeFunctionData } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { useState } from 'react';
const client = createPublicClient({
  chain: sepolia,
  transport: http(),
})
let client2
const helloWorldABI =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
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
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let account
const CONTRACT_ADDRESS = '0x0e30788fD72f5e8D293101eBc7B64CF8dC68dF4b'
const blockNumber = await client.getBlockNumber()
function App() {
  const [num, setNum] = useState(blockNumber)
  console.log(setNum)
  const [result, setResult] = useState('')
  const c_fn = async () => {
    if (window.ethereum) {
       client2 = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum)
      })
      account = await client2.requestAddresses()
      setResult(account)
    }
  }
  const read_fn = async () => {
    const data = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: helloWorldABI,
      functionName: 'getInfo',
    })
    console.log(data)
  }
  const change_fn = async () => {
    let {request}=await client.simulateContract({
      account: account[0],
      address: CONTRACT_ADDRESS,
      abi: helloWorldABI,
      functionName: 'setInfo',
      args: ['你好', 10]
    })
	await client2.writeContract(request)
  }
  return (
    <div className="App">
      {num}
      <button onClick={c_fn}>点击链接钱包</button>=={result}
      <button onClick={read_fn}>读取</button>
      <button onClick={change_fn}>修改</button>
    </div>
  );
}

export default App;
