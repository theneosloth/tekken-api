
const fs = require('fs');
const path = require('path');
const { getTotalDamage, normalizeCommand } = require('./util');

const inputDir = './data/json';

/**
 *
 * @param {String} name The name of the character
 * @returns {String} The path to the character json file.
 */

const getCharPath = (name) => path.join(inputDir, name+'.json');

const defaultFilterFn = d => d;
const defaultSortFn = () => 0;

/**
 * The helper function used by getCharData and getMoveData
 *
 * @param {String} name The name of the character
 * @param {Function} [filterFn] The filter function that is applied to the resulting dataset
 * @param {Function} [sortFn] The sort function that is applied to the resulting dataset
 * @returns {Array} The filtered dataset
 */
const getCharDataHelper = ({charname, filterFn = defaultFilterFn, sortFn = defaultSortFn}) => {
  // If we aren't filtering the content in any way, just serve the file as is.
  if (filterFn.toString() === defaultFilterFn && sortFn.toString() === defaultSortFn){
    return fs.readFileSync(getCharPath(charname));
  }

  const content = fs.readFileSync(getCharPath(charname));
  const records = JSON.parse(content);
  return records.filter(filterFn).sort(sortFn)
}

const getCharData = (charname, order) => {
  switch(order){
  case 'damage':
    const compareDamageFn = (m1, m2) => getTotalDamage(m2.damage) - getTotalDamage(m1.damage);
    return getCharDataHelper({charname: charname, sortFn: compareDamageFn });
  default:
    return getCharDataHelper({charname: charname});
  }
}

const getMoveData = (movename, charname, strict) => {
  if (strict === undefined){
    strict = true;
  }
  const findMoveFn = (move) => normalizeCommand(move.command) === normalizeCommand(movename);
  return getCharDataHelper({charname: charname, filterFn: findMoveFn});
}

module.exports = { getCharData, getMoveData };
