import generateParser from "./src/generateParser"
import parseToken from "./src/parseToken"

export { generateParser }
export { parseToken }

const parser = generateParser({
  headRule: '<E>',
  '<E>':    '<T> <E*>',
  '<E*>':   '+ <T> <E*> | v',
  '<T>':    '<F> <T*>',
  '<T*>':   '* <F> <T*> | v',
  '<F>':    '( <E> ) | id'
})

parseToken(parser, '(')
parseToken(parser, 'id')
parseToken(parser, '+')
parseToken(parser, 'id')
parseToken(parser, ')')
parseToken(parser, '*')
parseToken(parser, 'id')
parseToken(parser, '$')
