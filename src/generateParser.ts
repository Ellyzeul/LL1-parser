import Grammar from "../types/Grammar";
import Parser from "../types/Parser";
import getBufferedGrammar from "./getBufferedGrammar";
import getFirst from "./getFirst";
import getFollow from "./getFollow";

const generateParser = (grammar: Grammar) => {
  const parser = {} as Parser
  const { headRule, rules } = getBufferedGrammar(grammar)
  const inspectedFollows = {}

  Object.keys(rules).forEach(rule => {
    const first = getFirst(rules, rule)
    const follow = getFollow(headRule, rules, rule, inspectedFollows)

    parser[rule] = {
      first: first,
      follow: follow
    }
  })

  return parser
}

export default generateParser
