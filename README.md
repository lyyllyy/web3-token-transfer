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
- ✅ Automatic RPC endpoint selection
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

## 🌐 Supported Networks

| Network | ID | Native Token | Mainnet | Testnet |
|---------|-------|--------------|---------|---------|
| Ethereum | `ethereum` | ETH | ✅ | |
| Sepolia | `sepolia` | ETH | | ✅ |
| BSC | `bsc` | BNB | ✅ | |
| BSC Testnet | `bscTestnet` | BNB | | ✅ |
| Polygon | `polygon` | MATIC | ✅ | |
| Mumbai | `polygonMumbai` | MATIC | | ✅ |
| Arbitrum | `arbitrum` | ETH | ✅ | |
| Optimism | `optimism` | ETH | ✅ | |

## 📦 Project Structure

```
web3-token-transfer/
├── src/
│   ├── transfer.js        # Main script
│   ├── config.js          # Network configurations
│   ├── utils.js           # Helper functions
│   ├── validation.js      # Input validation
│   └── rpc-selector.js    # Automatic RPC selection
├── examples/
│   ├── send-eth.js        # Example: Send ETH
│   └── send-erc20.js      # Example: Send ERC-20
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
node test-installation.js

# Check configuration
npm run check

# Run unit tests
npm test

# Run example
npm run example:eth
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

## 🐛 Troubleshooting

### Common Issues

**"Insufficient balance"**
```bash
# Solution: Check your balance and add test tokens
https://sepoliafaucet.com
```

**"Rate limit exceeded"**
```bash
# Solution: Remove RPC_URL from .env for auto-selection
# Or get free API key from Alchemy: https://www.alchemy.com
```

**"Invalid address"**
```bash
# Ensure address:
# - Starts with 0x
# - Has 42 characters
# - Contains only hex characters
```

**"Network error"**
```bash
# Check internet connection
# Try different RPC endpoint
```

## 🔄 RPC Endpoints

### Automatic Selection (Recommended)

Remove or comment out `RPC_URL` in `.env`:
```env
# RPC_URL=  # Leave empty for auto-selection
```

The script will automatically test and select the fastest available RPC.

### Free RPC Providers

**Sepolia:**
```
https://rpc2.sepolia.org
https://ethereum-sepolia-rpc.publicnode.com
https://ethereum-sepolia.blockpi.network/v1/rpc/public
```

**With API Key (Best):**
- Alchemy: https://www.alchemy.com (300M compute units/month free)
- Infura: https://infura.io (100k requests/day free)

## 📖 Documentation

- [Quick Start Guide](./QUICKSTART.md)
- [RPC Endpoints List](./BEST_RPC_ENDPOINTS.md)
- [Fix Rate Limit Error](./FIX_RATE_LIMIT.md)
- [Full Installation Guide](./SETUP_GUIDE.md)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Ethers.js Documentation](https://docs.ethers.org/)
- [Ethereum JSON-RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- [ERC-20 Standard](https://eips.ethereum.org/EIPS/eip-20)

## 💬 Support

- Create an [Issue](https://github.com/YOUR_USERNAME/web3-token-transfer/issues)
- Read [Troubleshooting Guide](./TROUBLESHOOTING.md)
- Check [FAQ](./FAQ.md)

## ⚡ Quick Commands

```bash
# Start transfer
npm start

# Check configuration
npm run check

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Run example
npm run example:eth
```

## 🌟 Star History

If you find this project helpful, please give it a ⭐!

---

**⚠️ Disclaimer**: This script is provided "as is". Always test on testnets before using on mainnet. The authors are not responsible for any loss of funds.

**Made with ❤️ for the Web3 community**

---

### 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/web3-token-transfer?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/web3-token-transfer?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/YOUR_USERNAME/web3-token-transfer?style=social)
