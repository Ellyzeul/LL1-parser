import Grammar from "../types/Grammar";
import Parser from "../types/Parser";
import getBufferedGrammar from "./getBufferedGrammar";
import getFirst from "./getFirst";
import getFollow from "./getFollow";
import getParsingTable from "./getParsingTable";
import parseToken from "./parseToken";

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

  parser.parseToken = (token: string) => parseToken(parser, token)

  return parser
}

export default generateParser
