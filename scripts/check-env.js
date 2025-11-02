
require('dotenv').config();

const required = [
  'PRIVATE_KEY',
  'RECIPIENT_ADDRESS',
  'AMOUNT'
];

const optional = [
  'NETWORK',
  'TOKEN_ADDRESS',
  'RPC_URL'
];

console.log('🔍 Checking environment configuration...\n');

let hasErrors = false;

// Check required variables
console.log('Required variables:');
required.forEach(key => {
  if (process.env[key]) {
    console.log(`  ✓ ${key}`);
  } else {
    console.log(`  ✗ ${key} (MISSING)`);
    hasErrors = true;
  }
});

// Check optional variables
console.log('\nOptional variables:');
optional.forEach(key => {
  if (process.env[key]) {
    console.log(`  ✓ ${key}: ${process.env[key]}`);
  } else {
    console.log(`  - ${key}: (not set, using defaults)`);
  }
});

console.log('');

if (hasErrors) {
  console.error('❌ Some required variables are missing!');
  console.error('Please check your .env file.\n');
  process.exit(1);
} else {
  console.log('✅ All required variables are set!');
  console.log('You can now run: npm start\n');
}
