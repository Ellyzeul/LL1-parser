import Parser from "../types/Parser";

const getAllTerminals = (parser: Parser) => Object.keys(parser.sets)
  .map(rule => parser.sets[rule].first)
  .reduce((all, first) => [...all, ...first])
  .filter((first, idx, firsts) => first !== 'v' && firsts.findIndex(testing => testing === first) === idx)

export default getAllTerminals
