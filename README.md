# 🚀 Web3 Token Transfer

Simple and reliable Node.js script for sending tokens in Web3 networks (Ethereum, BSC, Polygon, etc.)

![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![ethers.js](https://img.shields.io/badge/ethers.js-v6-purple)

## ✨ Features

- ✅ Send native tokens (ETH, BNB, MATIC)
- ✅ Send ERC-20 tokens (USDT, USDC, DAI, etc.)
- ✅ Support for 8+ networks (Ethereum, BSC, Polygon, Arbitrum, Optimism)
- ✅ Testnet support (Sepolia, BSC Testnet, Mumbai)
- ✅ Gas estimation and balance checking
- ✅ Detailed transaction logging
- ✅ Error handling with helpful tips
- ✅ Block explorer integration

## 📋 Requirements

- Node.js >= 18.0.0
- npm or yarn

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/web3-token-transfer.git
cd web3-token-transfer

# Install dependencies
npm install

# Setup configuration
cp .env.example .env
nano .env  # Edit with your settings
```

### Configuration

Edit `.env` file:

```env
PRIVATE_KEY=your_private_key_without_0x
RECIPIENT_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
AMOUNT=0.01
NETWORK=sepolia
```

### Run

```bash
# Using .env configuration
npm start

# Using CLI arguments
node src/transfer.js \
  --key "your_private_key" \
  --to "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" \
  --amount "0.01" \
  --network "sepolia"
```

## 📚 Usage Examples

### Send ETH on Sepolia Testnet

```bash
node src/transfer.js \
  --key "your_private_key" \
  --to "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" \
  --amount "0.1" \
  --network "sepolia"
```

### Send USDT on Ethereum

```bash
node src/transfer.js \
  --key "your_private_key" \
  --to "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" \
  --amount "100" \
  --network "ethereum" \
  --token "0xdac17f958d2ee523a2206206994597c13d831ec7"
```

### Send BNB on BSC

```bash
node src/transfer.js \
  --key "your_private_key" \
  --to "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" \
  --amount "0.5" \
  --network "bsc"
```

### Using Custom RPC

```bash
node src/transfer.js \
  --rpc "https://your-custom-rpc.com" \
  --amount "0.1"
```


## 📦 Project Structure

```
web3-token-transfer/
├── src/
│   ├── transfer.js        # Main script
│   ├── config.js          # Network configurations
│   ├── utils.js           # Helper functions
│   └── validation.js      # Input validation  
├── scripts/
│   ├── check-env.js       # Check configuration
│   └── setup.sh           # Setup script
├── tests/
│   └── validation.test.js # Unit tests
├── .env.example           # Configuration template
├── package.json           # Dependencies
└── README.md              # Documentation
```

## 🔧 Parameters

| Parameter | CLI Flag | ENV Variable | Description | Required |
|-----------|----------|--------------|-------------|----------|
| Private Key | `--key` | `PRIVATE_KEY` | Sender's private key | ✅ |
| Recipient | `--to` | `RECIPIENT_ADDRESS` | Recipient address | ✅ |
| Amount | `--amount` | `AMOUNT` | Amount to send | ✅ |
| Network | `--network` | `NETWORK` | Network name | ❌ (default: sepolia) |
| Token | `--token` | `TOKEN_ADDRESS` | ERC-20 token address | ❌ (native if empty) |
| RPC URL | `--rpc` | `RPC_URL` | Custom RPC endpoint | ❌ (auto-select) |

## 📤 Output

```
🔐 Web3 Token Transfer Script

🌐 Connecting to Sepolia Testnet...
✅ Connected to chain ID: 11155111

📤 Preparing native token transfer...
From: 0xYour...
To: 0x742d...
Amount: 0.01 tokens

Current balance: 1.5 tokens
Estimated gas fee: 0.000021 tokens

🚀 Sending transaction...
✅ Transaction sent!
TX Hash: 0xabc123...

⏳ Waiting for confirmation...
✅ Transaction confirmed in block 1234567
Gas used: 21000
Status: Success

🔍 View on explorer: https://sepolia.etherscan.io/tx/0xabc123...

✨ Transfer completed successfully!
```

## 🧪 Testing

### Get Test Tokens

- **Sepolia ETH**: https://sepoliafaucet.com
- **BSC Testnet BNB**: https://testnet.bnbchain.org/faucet-smart
- **Mumbai MATIC**: https://faucet.polygon.technology

### Run Tests

```bash
# Check installation
node quick-test.js

# Check configuration
npm run check

# Run unit tests
npm test
```

## ⚠️ Security

### 🔒 IMPORTANT

- **NEVER** commit `.env` file with real private keys
- **NEVER** share your private key
- Always test on testnets first
- Double-check addresses before sending
- Start with small amounts

### ✅ Best Practices

1. Add `.env` to `.gitignore`:
   ```bash
   echo ".env" >> .gitignore
   ```

2. Use environment variables for production

3. Use separate wallets for testing

4. Regularly rotate keys



## ⚡ Quick Commands

```bash
# Start transfer
npm start

# Check configuration
npm run check

# Run tests
npm test
```


---

**⚠️ Disclaimer**: This script is provided "as is". Always test on testnets before using on mainnet. The authors are not responsible for any loss of funds.



