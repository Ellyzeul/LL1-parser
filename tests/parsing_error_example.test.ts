import { describe, it, expect } from "@jest/globals"
import generateParser from "../src/generateParser";
import parseToken from "../src/parseToken";

const parser = generateParser({
  headRule: '<IF_STMT>',
  '<IF_STMT>':        'if ( <EXPR> ) <IF_BODY>',
  '<EXPR>':           'a == b',
  '<IF_BODY>':        '<THEN_ELSE_BODY> <ELSE>',
  '<ELSE>':           'else <THEN_ELSE_BODY> | v',
  '<THEN_ELSE_BODY>': '<CMD> | { <CMD_LIST> }',
  '<CMD_LIST>':       '<CMD> <CMD_LIST> | v',
  '<CMD>':            'a = b ;'
})

const testParse = (token: string, has_errors: boolean = false, parsing_ended: boolean = false, errorsLength: number = 0) => {
  const result = parseToken(parser, token)

  expect(result.has_errors).toBe(has_errors)
  expect(result.parsing_ended).toBe(parsing_ended)
  expect(result.errors.length).toBe(errorsLength)
}

describe('Parsing the following input: if(;) a = b;', () => {

  /**
   * A valid input would be: if(a == b) a = b;
   * 
   * So passing: if(;) a = b;
   * will generate an error parsing the semicolon wrapped around parentheses
   */

  it('should parse: <if> ( ; ) a = b ; $', () => testParse('if'))
  it('should parse: if <(> ; ) a = b ; $', () => testParse('('))
  it("shouldn't parse: if ( <;> ) a = b ; $", () => testParse(';', true, false, 1))
  it('should parse: if ( ; <)> a = b ; $', () => testParse(')'))
  it('should parse: if ( ; ) <a> = b ; $', () => testParse('a'))
  it('should parse: if ( ; ) a <=> b ; $', () => testParse('='))
  it('should parse: if ( ; ) a = <b> ; $', () => testParse('b'))
  it('should parse: if ( ; ) a = b <;> $', () => testParse(';'))
  it('should parse: if ( ; ) a = b ; <$>', () => testParse('$', false, true, 0))
})

describe('Parsing the following input: if(a == b) {a = b a = b;} else a = b;', () => {

  /**
   * A valid input would be: if(a == b) {a = b; a = b;} else a = b;
   * 
   * So passinf: if(a == b) {a = b a = b;} else a = b;
   * will generate an error parsing the a = b without a semicolon on then condition
   */

  it('should parse: <if> ( a == b ) { a = b a = b ; } else a = b ; $', () => testParse('if'))
  it('should parse: if <(> a == b ) { a = b a = b ; } else a = b ; $', () => testParse('('))
  it('should parse: if ( <a> == b ) { a = b a = b ; } else a = b ; $', () => testParse('a'))
  it('should parse: if ( a <==> b ) { a = b a = b ; } else a = b ; $', () => testParse('=='))
  it('should parse: if ( a == <b> ) { a = b a = b ; } else a = b ; $', () => testParse('b'))
  it('should parse: if ( a == b <)> { a = b a = b ; } else a = b ; $', () => testParse(')'))
  it('should parse: if ( a == b ) <{> a = b a = b ; } else a = b ; $', () => testParse('{'))
  it('should parse: if ( a == b ) { <a> = b a = b ; } else a = b ; $', () => testParse('a'))
  it('should parse: if ( a == b ) { a <=> b a = b ; } else a = b ; $', () => testParse('='))
  it('should parse: if ( a == b ) { a = <b> a = b ; } else a = b ; $', () => testParse('b'))
  it("shouldn't parse: if ( a == b ) { a = b <a> = b ; } else a = b ; $", () => testParse('a', true, false, 1))
  it('should parse: if ( a == b ) { a = b a <=> b ; } else a = b ; $', () => testParse('='))
  it('should parse: if ( a == b ) { a = b a = <b> ; } else a = b ; $', () => testParse('b'))
  it('should parse: if ( a == b ) { a = b a = b <;> } else a = b ; $', () => testParse(';'))
  it('should parse: if ( a == b ) { a = b a = b ; <}> else a = b ; $', () => testParse('}'))
  it('should parse: if ( a == b ) { a = b a = b ; } <else> a = b ; $', () => testParse('else'))
  it('should parse: if ( a == b ) { a = b a = b ; } else <a> = b ; $', () => testParse('a'))
  it('should parse: if ( a == b ) { a = b a = b ; } else a <=> b ; $', () => testParse('='))
  it('should parse: if ( a == b ) { a = b a = b ; } else a = <b> ; $', () => testParse('b'))
  it('should parse: if ( a == b ) { a = b a = b ; } else a = b <;> $', () => testParse(';'))
  it('should parse: if ( a == b ) { a = b a = b ; } else a = b ; <$>', () => testParse('$', false, true, 0))
})
