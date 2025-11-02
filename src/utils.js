const { ethers } = require('ethers');

function parseArguments() {
  const args = process.argv.slice(2);
  const params = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const value = args[i + 1];
      if (value && !value.startsWith('--')) {
        params[key] = value;
        i++;
      }
    }
  }
  return params;
}

function formatBalance(balance, decimals = 18) {
  return ethers.formatUnits(balance, decimals);
}

function parseAmount(amount, decimals = 18) {
  return ethers.parseUnits(amount, decimals);
}

function shortenAddress(address, chars = 4) {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
}

function formatGasPrice(gasPrice) {
  return ethers.formatUnits(gasPrice, 'gwei');
}

const logger = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  warning: (msg) => console.warn(`⚠️  ${msg}`),
  log: (msg) => console.log(msg)
};

function displayTransactionSummary(params) {
  console.log('\n' + '='.repeat(50));
  console.log('📋 TRANSACTION SUMMARY');
  console.log('='.repeat(50));
  console.log(`From:        ${shortenAddress(params.from)}`);
  console.log(`To:          ${shortenAddress(params.to)}`);
  console.log(`Amount:      ${params.amount} ${params.symbol || 'tokens'}`);
  console.log(`Network:     ${params.network}`);
  if (params.tokenAddress) {
    console.log(`Token:       ${shortenAddress(params.tokenAddress)}`);
  }
  console.log('='.repeat(50) + '\n');
}

function formatError(error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    return 'Insufficient funds for transaction and gas fees';
  }
  if (error.code === 'NETWORK_ERROR') {
    return 'Network error. Check your connection';
  }
  return error.message || 'Unknown error';
}

module.exports = {
  parseArguments,
  formatBalance,
  parseAmount,
  shortenAddress,
  formatGasPrice,
  logger,
  displayTransactionSummary,
  formatError
};