import BufferedGrammar from "../types/BufferedGrammar"
import Grammar from "../types/Grammar"

const getBufferedGrammar = (grammar: Grammar) => {
  const bufferedGrammar = {} as BufferedGrammar
  const { headRule, ...rules } = grammar

  bufferedGrammar.headRule = headRule
  bufferedGrammar.rules = {}
  Object.keys(rules)
    .forEach(rule => {
      bufferedGrammar.rules[rule] = [[]]
      grammar[rule].split(' ').forEach(rulePart => rulePart === '|' 
        ? bufferedGrammar.rules[rule].push([])
        : bufferedGrammar.rules[rule][bufferedGrammar.rules[rule].length-1].push(rulePart)
      )
    })

  return bufferedGrammar
}

export default getBufferedGrammar
