import { describe, it, expect } from "@jest/globals"
import generateParser from "../src/generateParser";
import parseToken from "../src/parseToken";

/**
 * Original unfactored grammar
 * 
 * S -> A a | b
 * A -> Ac | Sd | ε
 * 
 * Factored grammar
 * 
 * S  -> A a | b
 * A  -> b d A' | A'
 * A' -> c A' | a d A' | ε
 */

const parser = generateParser({
  headRule: '<S>',
  '<S>':  'c <A> a',
  '<A>':  'c <B> | <B>',
  '<B>':  'b c <B> | v',
})

const testParse = (token: string, has_errors: boolean = false, parsing_ended: boolean = false, errorsLength: number = 0) => {
  const result = parser.parseToken(token)

  expect(result.has_errors).toBe(has_errors)
  expect(result.parsing_ended).toBe(parsing_ended)
  expect(result.errors.length).toBe(errorsLength)
}

describe('Parsing the following input using object-oriented approach: ca', () => {
  it('should parse: <c> a $', () => testParse('c'))
  it('should parse: c <a> $', () => testParse('a'))
  it('should parse: c a <$>', () => testParse('$', false, true, 0))
})

describe('Parsing the following input using object-oriented approach: cbca', () => {
  it('should parse: <c> b c a $', () => testParse('c'))
  it('should parse: c <b> c a $', () => testParse('b'))
  it('should parse: c b <c> a $', () => testParse('c'))
  it('should parse: c b c <a> $', () => testParse('a'))
  it('should parse: c b c a <$>', () => testParse('$', false, true, 0))
})
