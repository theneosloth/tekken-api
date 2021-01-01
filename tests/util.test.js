const {normalizeCommand, getTotalDamage, replaceNickname} = require('../src/util');

test('normalized f, n, d, d/f+1 input', () => {
  const result = normalizeCommand('f, n, d, d/f+1');
  expect(result).toBe('fnddf1');
})

test('EWGF nickname', () => {
  const result = replaceNickname('EWGF');
  expect(result).toBe('fnddf+2');
})
