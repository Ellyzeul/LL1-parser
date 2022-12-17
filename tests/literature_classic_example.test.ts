import { describe, expect, it } from "@jest/globals";
import generateParser from "../src/generateParser";
import parseToken from "../src/parseToken";

/**
 * Original unfactored grammar
 * 
 * E -> E + T | T
 * T -> T * F | F
 * F -> ( E ) | id
 * 
 * Factored grammar
 * 
 * E  -> T E'
 * E' -> + T E' | ε
 * T  -> F T'
 * T' -> * F T' | ε
 * F  -> ( E ) | id
 */

const parser = generateParser({
  headRule: '<E>',
  '<E>':    '<T> <E*>',
  '<E*>':   '+ <T> <E*> | v',
  '<T>':    '<F> <T*>',
  '<T*>':   '* <F> <T*> | v',
  '<F>':    '( <E> ) | id'
})

const testParse = (token: string, has_errors: boolean = false, parsing_ended: boolean = false, errorsLength: number = 0) => {
  const result = parseToken(parser, token)

  expect(result.has_errors).toBe(has_errors)
  expect(result.parsing_ended).toBe(parsing_ended)
  expect(result.errors.length).toBe(errorsLength)
}

describe('Parsing the following input: id+id', () => {
  it('should parse: <id> + id $', () => testParse('id'))
  it('should parse: id <+> id $', () => testParse('+'))
  it('should parse: id + <id> $', () => testParse('id'))
  it('should parse: id + id <$>', () => testParse('$', false, true, 0))
})

describe('Parsing the following input: (id+id)*id', () => {
  it('should parse: <(> id + id ) * id $', () => testParse('('))
  it('should parse: ( <id> + id ) * id $', () => testParse('id'))
  it('should parse: ( id <+> id ) * id $', () => testParse('+'))
  it('should parse: ( id + <id> ) * id $', () => testParse('id'))
  it('should parse: ( id + id <)> * id $', () => testParse(')'))
  it('should parse: ( id + id ) <*> id $', () => testParse('*'))
  it('should parse: ( id + id ) * <id> $', () => testParse('id'))
  it('should parse: ( id + id ) * id <$>', () => testParse('$', false, true, 0))
})