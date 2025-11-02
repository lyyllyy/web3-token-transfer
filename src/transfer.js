

const { ethers } = require('ethers');
const dotenv = require('dotenv');
const { getNetworkConfig, getRpcUrl, getExplorerUrl } = require('./config');
const { validateInputs, sanitizePrivateKey } = require('./validation');
const {
  parseArguments,
  formatBalance,
  parseAmount,
  logger,
  displayTransactionSummary,
  formatError
} = require('./utils');

dotenv.config();

const ERC20_ABI = [
  'function transfer(address to, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)'
];

async function sendNativeToken(wallet, toAddress, amount) {
  logger.log('\n📤 Preparing native token transfer...');
  logger.log(`From: ${wallet.address}`);
  logger.log(`To: ${toAddress}`);
  logger.log(`Amount: ${amount} tokens\n`);

  const balance = await wallet.provider.getBalance(wallet.address);
  const balanceInEther = formatBalance(balance);
  logger.log(`Current balance: ${balanceInEther} tokens`);

  const amountInWei = parseAmount(amount);
  if (balance < amountInWei) {
    throw new Error('Insufficient balance');
  }

  const feeData = await wallet.provider.getFeeData();
  const gasLimit = 21000n;
  const estimatedFee = feeData.gasPrice * gasLimit;
  logger.log(`Estimated gas fee: ${formatBalance(estimatedFee)} tokens\n`);

  const tx = { to: toAddress, value: amountInWei, gasLimit };

  logger.log('🚀 Sending transaction...');
  const txResponse = await wallet.sendTransaction(tx);
  logger.success(`Transaction sent!`);
  logger.log(`TX Hash: ${txResponse.hash}\n`);

  logger.log('⏳ Waiting for confirmation...');
  const receipt = await txResponse.wait();

  logger.success(`Transaction confirmed in block ${receipt.blockNumber}`);
  logger.log(`Gas used: ${receipt.gasUsed.toString()}`);
  logger.log(`Status: ${receipt.status === 1 ? 'Success' : 'Failed'}\n`);

  return receipt;
}

async function sendERC20Token(wallet, tokenAddress, toAddress, amount) {
  logger.log('\n📤 Preparing ERC-20 token transfer...');
  logger.log(`Token Contract: ${tokenAddress}`);
  logger.log(`From: ${wallet.address}`);
  logger.log(`To: ${toAddress}\n`);

  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);

  const [decimals, symbol, balance] = await Promise.all([
    tokenContract.decimals(),
    tokenContract.symbol(),
    tokenContract.balanceOf(wallet.address)
  ]);

  logger.log(`Token: ${symbol}`);
  logger.log(`Decimals: ${decimals}`);

  const balanceFormatted = formatBalance(balance, decimals);
  logger.log(`Current balance: ${balanceFormatted} ${symbol}`);

  const amountInUnits = parseAmount(amount, decimals);
  logger.log(`Amount to send: ${amount} ${symbol}\n`);

  if (balance < amountInUnits) {
    throw new Error('Insufficient token balance');
  }

  logger.log('📊 Estimating gas...');
  const gasEstimate = await tokenContract.transfer.estimateGas(toAddress, amountInUnits);
  const feeData = await wallet.provider.getFeeData();
  const estimatedFee = feeData.gasPrice * gasEstimate;
  logger.log(`Estimated gas: ${gasEstimate.toString()}`);
  logger.log(`Estimated gas fee: ${formatBalance(estimatedFee)} native tokens\n`);

  logger.log('🚀 Sending transaction...');
  const tx = await tokenContract.transfer(toAddress, amountInUnits);
  logger.success(`Transaction sent!`);
  logger.log(`TX Hash: ${tx.hash}\n`);

  logger.log('⏳ Waiting for confirmation...');
  const receipt = await tx.wait();

  logger.success(`Transaction confirmed in block ${receipt.blockNumber}`);
  logger.log(`Gas used: ${receipt.gasUsed.toString()}`);
  logger.log(`Status: ${receipt.status === 1 ? 'Success' : 'Failed'}\n`);

  return receipt;
}

async function main() {
  try {
    console.log('🔐 Web3 Token Transfer Script\n');

    const args = parseArguments();

    const privateKey = args.key || process.env.PRIVATE_KEY;
    const recipientAddress = args.to || process.env.RECIPIENT_ADDRESS;
    const amount = args.amount || process.env.AMOUNT;
    const network = args.network || process.env.NETWORK || 'sepolia';
    const tokenAddress = args.token || process.env.TOKEN_ADDRESS;
    const rpcUrl = args.rpc || process.env.RPC_URL || getRpcUrl(network);

    const validation = validateInputs({
      privateKey,
      to: recipientAddress,
      amount,
      tokenAddress
    });

    if (!validation.valid) {
      validation.errors.forEach(err => logger.error(err));
      process.exit(1);
    }

    const networkConfig = getNetworkConfig(network);
    logger.log(`🌐 Connecting to ${networkConfig.name}...`);
    logger.log(`RPC: ${rpcUrl}\n`);

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const sanitizedKey = sanitizePrivateKey(privateKey);
    const wallet = new ethers.Wallet(sanitizedKey, provider);

    const networkInfo = await provider.getNetwork();
    logger.success(`Connected to chain ID: ${networkInfo.chainId}\n`);

    let receipt;
    if (tokenAddress) {
      receipt = await sendERC20Token(wallet, tokenAddress, recipientAddress, amount);
    } else {
      receipt = await sendNativeToken(wallet, recipientAddress, amount);
    }

    const explorerUrl = getExplorerUrl(network, receipt.hash);
    logger.log(`🔍 View on explorer: ${explorerUrl}`);
    logger.success('\n✨ Transfer completed successfully!\n');

  } catch (error) {
    logger.error(`\n${formatError(error)}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { sendNativeToken, sendERC20Token };