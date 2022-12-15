import Parser from "../types/Parser"
import getAllTerminals from "./getAllTerminals"
import getErrorTreatmentTokens from "./getErrorTreatmentTokens"

const getParsingTable = (parser: Parser, rules: {[rule: string]: string[][]}) => {
  const parsingTable = {} as {[terminal: string]: {[non_terminal: string]: string[]}}
  const terminals = getAllTerminals(parser)
  const nonTerminals = Object.keys(parser.sets)

  nonTerminals.forEach(nonTerminal => {
    const { first, follow } = parser.sets[nonTerminal]
    parsingTable[nonTerminal] = getErrorTreatmentTokens(first, follow)

    terminals.forEach(terminal => {
      const ruleParts = rules[nonTerminal]
      const totalParts = ruleParts.length

      for(let i = 0; i < totalParts; i++) {
        const part = ruleParts[i][0]
        const isTerminal = part.charAt(0) !== '<'

        if(
          (isTerminal && (part === terminal)) ||
          ((!isTerminal) && (parser.sets[part].first.findIndex(first => first === terminal) !== -1))
        ) {
          parsingTable[nonTerminal][terminal] = ruleParts[i]
          break
        }
      }
    })
  })

  return parsingTable
}

export default getParsingTable
