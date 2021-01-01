const replaceNickname = (command) => {
  const shortcuts = {
    'CD': 'fnddf',
    'EWGF': 'fnddf+2'
  }

  Object.entries(shortcuts).forEach(shortcut => {
    original = shortcut[0];
    replacement = shortcut[1];
    if (command.includes(original)){
      command = command.replace(original, replacement);
    }
  });
  return command;
}

/**
 * Return a normalized version of a tekken input. This simply replaces all the whitespace, commas and slashes
 * @param {String} command
 * @returns {String} normalized command
 */
function normalizeCommand(command) {
  return replaceNickname(command).replace(/\/|\\|,(\s)*|\+/gi, '')
}

const getTotalDamage = (move) => {
  return move.split(',').map(m => parseInt(m)).reduce((x, y) => x + y);
}

module.exports = {normalizeCommand, getTotalDamage, replaceNickname}
