import { describe, it, expect } from "@jest/globals"
import generateParser from "../src/generateParser";
import parseToken from "../src/parseToken";

const parser = generateParser({
  headRule: '<rexpr>',
  '<rexpr>':                  '<rterm> <rexpr*>',
  '<rexpr*>':                 '+ <rterm> <rexpr*> | v',
  '<rterm>':                  '<rfactor> <rterm*>',
  '<rterm*>':                 '<rfactor> <rterm*> | v',
  '<rfactor>':                '<rprimary> <rfactor*>',
  '<rfactor*>':               '* <rfactor*> | v',
  '<rprimary>':               'a | b'
})

const testParse = (token: string, has_errors: boolean = false, parsing_ended: boolean = false, errorsLength: number = 0) => {
  const result = parseToken(parser, token)

  expect(result.has_errors).toBe(has_errors)
  expect(result.parsing_ended).toBe(parsing_ended)
  expect(result.errors.length).toBe(errorsLength)
}

describe('Parsing the following input: a + b * b', () => {
  it('should parse: <a> + b * b', () => testParse('a'))
  it('should parse: a <+> b * b', () => testParse('+'))
  it('should parse: a + <b> * b', () => testParse('b'))
  it('should parse: a + b <*> b', () => testParse('*'))
  it('should parse: a + b * <b>', () => testParse('b'))
  it('should parse: a + b * b <$>', () => testParse('$', false, true, 0))
})
