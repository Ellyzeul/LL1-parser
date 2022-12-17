import Grammar from "../types/Grammar";
import Parser from "../types/Parser";
import getBufferedGrammar from "./getBufferedGrammar";
import getFirst from "./getFirst";
import getFollow from "./getFollow";
import getParsingTable from "./getParsingTable";

const generateParser = (grammar: Grammar) => {
  const { headRule, rules } = getBufferedGrammar(grammar)
  const parser = {
    headRule: headRule,
    sets: {},
    parsing_stack: null
  } as Parser
  const inspectedFollows = {}

  Object.keys(rules).forEach(rule => {
    const first = getFirst(rules, rule)
    const follow = getFollow(headRule, rules, rule, inspectedFollows)

    parser.sets[rule] = {
      first: first,
      follow: follow
    }
  })

  parser.parsing_table = getParsingTable(parser, rules)

  return parser
}

export default generateParser
