const {normalizeCommand, getTotalDamage, replaceNickname} = require('../src/util');

test('normalized d/f+1', () => {
  const result = normalizeCommand('f, n, d, d/f+1');
  expect(result).toBe('fnddf+1');
})

test('EWGF nickname', () => {
  const result = replaceNickname('EWGF');
  expect(result).toBe('fnddf+2');
})
