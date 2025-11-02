const { isValidAddress, validateAmount } = require('../src/validation');

describe('Validation Tests', () => {
  test('should validate correct Ethereum address', () => {
    expect(isValidAddress('0x85c4d31a982101cf98cecd9decbaa2082cd477f0')).toBe(true);
  });

  test('should reject invalid address', () => {
    expect(isValidAddress('0xinvalid')).toBe(false);
    expect(isValidAddress('not-an-address')).toBe(false);
  });

  test('should validate amount', () => {
    expect(validateAmount('1.5').valid).toBe(true);
    expect(validateAmount('0').valid).toBe(false);
    expect(validateAmount('-1').valid).toBe(false);
    expect(validateAmount('abc').valid).toBe(false);
  });
});
