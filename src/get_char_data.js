
const fs = require('fs');
const path = require('path');
const stringSimilarity = require('string-similarity');

const { getTotalDamage, normalizeCommand } = require('./util');

const inputDir = './data/json';

/**
 *
 * @param {String} name The name of the character
 * @returns {String} The path to the character json file.
 */

const getCharPath = (name) => path.join(inputDir, name+'.json');

/**
 * The helper function used by getCharData and getMoveData
 *
 * @param {String} name The name of the character
 * @param {Boolean} raw Return the json file without parsing it.
 * @returns {Array|Buffer} Return the parsed array if raw is false, file buffer is raw is true.
 */
const getCharDataHelper = (charName, raw = false) => {
  const content = fs.readFileSync(getCharPath(charName));

  if (raw){
    return content;
  }

  return JSON.parse(content);
}

const getCharData = (charName, order) => {
  switch(order){
  case 'damage':
    const compareDamageFn = (m1, m2) => getTotalDamage(m2.damage) - getTotalDamage(m1.damage);
    return getCharDataHelper(charName).filter(compareDamageFn);
  default:
    return getCharDataHelper(charName, true);
  }
}

const getMoveData = (charName, moveName, fuzzy = false) => {
  if (fuzzy) {
    const matches = getSimilarMoves(charName, moveName);
    return matches.map(match => getMoveData(charName, match, false));
  }
  const findMoveFn = (move) => normalizeCommand(move.command) === normalizeCommand(moveName);
  return getCharDataHelper(charName).filter(findMoveFn);
}

const getCharMoves = (charName) => {
  return getCharDataHelper(charName).map(move => move.command);
}

const getSimilarMoves = (charName, moveName, threshold = 0.7) =>  {
  const moves = getCharMoves(charName).map(move => normalizeCommand(move));
  const similarMoves = [];
  moves.forEach(move => {
    const moveDiff = stringSimilarity.compareTwoStrings(move, normalizeCommand(moveName));
    if (moveDiff > threshold) {
      console.log(move, moveName, moveDiff);
      similarMoves.push(move);
    }
  });
  return similarMoves;
}

module.exports = { getCharData, getMoveData, getCharMoves, getSimilarMoves };
