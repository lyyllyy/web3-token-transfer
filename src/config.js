/**
 * Network configurations
 */

const NETWORKS = {
    // Mainnets
    ethereum: {
      name: 'Ethereum Mainnet',
      chainId: 1,
      rpcUrls: ['https://eth.llamarpc.com', 'https://rpc.ankr.com/eth'],
      explorer: 'https://etherscan.io',
      nativeToken: { symbol: 'ETH', decimals: 18 },
      isTestnet: false
    },
    bsc: {
      name: 'BNB Smart Chain',
      chainId: 56,
      rpcUrls: ['https://bsc-dataseed1.binance.org', 'https://rpc.ankr.com/bsc'],
      explorer: 'https://bscscan.com',
      nativeToken: { symbol: 'BNB', decimals: 18 },
      isTestnet: false
    },
    polygon: {
      name: 'Polygon',
      chainId: 137,
      rpcUrls: ['https://polygon-rpc.com', 'https://rpc.ankr.com/polygon'],
      explorer: 'https://polygonscan.com',
      nativeToken: { symbol: 'MATIC', decimals: 18 },
      isTestnet: false
    },
    arbitrum: {
      name: 'Arbitrum One',
      chainId: 42161,
      rpcUrls: ['https://arb1.arbitrum.io/rpc'],
      explorer: 'https://arbiscan.io',
      nativeToken: { symbol: 'ETH', decimals: 18 },
      isTestnet: false
    },
    optimism: {
      name: 'Optimism',
      chainId: 10,
      rpcUrls: ['https://mainnet.optimism.io'],
      explorer: 'https://optimistic.etherscan.io',
      nativeToken: { symbol: 'ETH', decimals: 18 },
      isTestnet: false
    },
  
    // Testnets
    sepolia: {
      name: 'Sepolia Testnet',
      chainId: 11155111,
      rpcUrls: ['https://rpc.sepolia.org', 'https://rpc.ankr.com/eth_sepolia'],
      explorer: 'https://sepolia.etherscan.io',
      nativeToken: { symbol: 'ETH', decimals: 18 },
      faucets: ['https://sepoliafaucet.com'],
      isTestnet: true
    },
    bscTestnet: {
      name: 'BSC Testnet',
      chainId: 97,
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
      explorer: 'https://testnet.bscscan.com',
      nativeToken: { symbol: 'BNB', decimals: 18 },
      faucets: ['https://testnet.bnbchain.org/faucet-smart'],
      isTestnet: true
    },
    polygonMumbai: {
      name: 'Polygon Mumbai',
      chainId: 80001,
      rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
      explorer: 'https://mumbai.polygonscan.com',
      nativeToken: { symbol: 'MATIC', decimals: 18 },
      faucets: ['https://faucet.polygon.technology'],
      isTestnet: true
    }
  };
  
  function getNetworkConfig(networkName) {
    const network = NETWORKS[networkName.toLowerCase()];
    if (!network) {
      const available = Object.keys(NETWORKS).join(', ');
      throw new Error(`Unknown network: ${networkName}\nAvailable: ${available}`);
    }
    return network;
  }
  
  function getRpcUrl(networkName) {
    const network = getNetworkConfig(networkName);
    return network.rpcUrls[0];
  }
  
  function getExplorerUrl(networkName, txHash) {
    const network = getNetworkConfig(networkName);
    return `${network.explorer}/tx/${txHash}`;
  }
  
  module.exports = {
    NETWORKS,
    getNetworkConfig,
    getRpcUrl,
    getExplorerUrl
  };