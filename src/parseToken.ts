import Parser from "../types/Parser"

const parseToken = (parser: Parser, token: string) => {
  if(!parser.parsing_stack) parser.parsing_stack = [parser.headRule]
  const { parsing_table, parsing_stack } = parser
  const errors = [] as {expected: string[], got: string}[]
  let top = parsing_stack.pop() as string | null
  let isParsing = true

  while(isParsing) {
    console.log(top)
    if(top === token) {
      isParsing = false
      break
    }
    if(top === null) {
      pushError(errors, {'$': null}, token)
      break
    }

    const rule = parsing_table[top][token] || null

    if(rule === null) {
      parsing_stack.push(top)
      pushError(errors, parsing_table[top], token)
      break
    }

    if(rule[0] !== '@') parsing_stack.push(...rule.reverse())
    top = parsing_stack.pop() || null
  }

  return getReturn(parser, errors)
}

const pushError = (errors: {expected: string[], got: string}[], tableRow: {[non_terminal: string]: string[]}, token: string) => errors.push({
  expected: Object.keys(tableRow),
  got: token
})

const getReturn = (parser: Parser, errors: {expected: string[], got: string}[]) => ({
  parsing_ended: parser.parsing_stack.length === 0,
  errors: errors,
  has_errors: errors.length > 0
})

export default parseToken
