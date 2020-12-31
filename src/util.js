const replaceNickname = (command) => {
  const shortcuts = {
    'CD': 'fnddf',
    'EWGF': 'fnddf+2'
  }

  Object.entries(shortcuts).forEach((original, replacement) => {
    if (command.includes(original)){
      command.replace(original, replacement);
    }
  });
}

/**
 * Return a normalized version of a tekken input. This simply replaces all the whitespace, commas and slashes
 * @param {String} command
 * @returns {String} normalized command
 */
function normalizeCommand(command) {
  return command.replace(/\/|\\|\s|,/gi, '')
}

const getTotalDamage = (move) => {
  return move.split(',').map(m => parseInt(m)).reduce((x, y) => x + y);
}

module.exports = {normalizeCommand, getTotalDamage, replaceNickname}
