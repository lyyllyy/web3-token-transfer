const { ethers } = require('ethers');

function isValidAddress(address) {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
}

function isValidPrivateKey(privateKey) {
  try {
    const key = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
    new ethers.Wallet(key);
    return true;
  } catch {
    return false;
  }
}

function validateAmount(amount) {
  if (!amount) {
    return { valid: false, error: 'Amount is required' };
  }
  const parsed = parseFloat(amount);
  if (isNaN(parsed) || parsed <= 0) {
    return { valid: false, error: 'Amount must be positive number' };
  }
  return { valid: true, value: parsed };
}

function validateInputs(params) {
  const errors = [];

  if (!params.privateKey) {
    errors.push('Private key is required');
  } else if (!isValidPrivateKey(params.privateKey)) {
    errors.push('Invalid private key format');
  }

  if (!params.to || !isValidAddress(params.to)) {
    errors.push('Invalid recipient address');
  }

  const amountValidation = validateAmount(params.amount);
  if (!amountValidation.valid) {
    errors.push(amountValidation.error);
  }

  if (params.tokenAddress && !isValidAddress(params.tokenAddress)) {
    errors.push('Invalid token contract address');
  }

  return { valid: errors.length === 0, errors };
}

function sanitizePrivateKey(privateKey) {
  if (!privateKey) return '';
  let key = privateKey.trim();
  if (key.startsWith('0x')) {
    key = key.slice(2);
  }
  if (key.length !== 64) {
    throw new Error('Invalid private key length');
  }
  return key;
}

module.exports = {
  isValidAddress,
  isValidPrivateKey,
  validateAmount,
  validateInputs,
  sanitizePrivateKey
};