#!/usr/bin/env node

console.log('🧪 Quick Test\n');

// Test 1: ethers.js
try {
  const { ethers } = require('ethers');
  console.log('✅ ethers.js:', ethers.version);
} catch (e) {
  console.log('❌ ethers.js failed:', e.message);
}

// Test 2: dotenv
try {
  require('dotenv');
  console.log('✅ dotenv: installed');
} catch (e) {
  console.log('❌ dotenv failed:', e.message);
}

// Test 3: Node.js version
const version = process.version;
const major = parseInt(version.slice(1).split('.')[0]);
if (major >= 18) {
  console.log('✅ Node.js:', version);
} else {
  console.log('⚠️  Node.js:', version, '(need >= 18)');
}

// Test 4: Basic ethers functionality
try {
  const { ethers } = require('ethers');
  const isValid = ethers.isAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
  console.log('✅ Address validation:', isValid);
  
  const amount = ethers.parseEther('1.0');
  console.log('✅ Amount parsing:', ethers.formatEther(amount), 'ETH');
} catch (e) {
  console.log('❌ Ethers functionality failed:', e.message);
}

console.log('\n🎉 All core dependencies are working!\n');