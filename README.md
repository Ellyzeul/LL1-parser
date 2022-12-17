# LL1-parser

A non-recursive predicative parser for LL(1) Grammars.

The grammar should already be properly in LL(1) format for the parser to work as expected, there isn't any kind of automatic treatment.

So, having the following grammar:

```
rexpr     -> rexpr + rterm | rterm
rterm     -> rterm rfactor | rfactor
rfactor   -> rfactor * | rprimary
rprimary  -> a | b
```

It has to be transformed, beforehand, into:

```
rexpr     -> rterm rexpr'
rexpr'    -> + rterm rexpr' | ε
rterm     -> rfactor rterm'
rterm'    -> rfactor rterm' | ε
rfactor   -> rprimary rfactor'
rfactor'  -> * rfactor' | ε
rprimary  -> a | b
```

It might be implemented in the future, but no guarantee.

## Generating a parser

To generate a parser, the `generateParser` function should be used.

```typescript
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
```

Any symbol wrapped around `<>` will be interpreted as a non-terminal.

The parser has some reserved symbols for internal processes. The symbols are the following:

| Symbol | What it means                                | User allowed to use |
|--------|----------------------------------------------|---------------------|
|   v    | Empty input character                        | Yes                 |
|   $    | End of string character                      | Yes                 |
|   @    | Synchronizing token. For panic recovery mode | No                  |

## Parsing tokens

As for now, the parser only parses token by token, so an input should have been previously broke into tokens by a lexical analyzer.

To parse tokens, the `parseToken` function should be used on a procedural approach, or call the `parser.parseToken` method on an object-oriented approach.

```typescript
const result = parseToken(parser, '$')
```
Or
```typescript
const result = parser.parseToken('$')
```

The `result` object will have the following object:

```typescript
{
  parsing_ended: boolean,
  errors: {
    expected: string[], 
    got: string
  }[],
  has_errors: boolean
}
```

The `parsing_ended` property says if the latest parsed token reached the end of the parsing table. The end may be reached by an errorless parsing, or by a error panic recovery.

The `errors` property bears all errors found on the parsing.

The `has_errors` property says if the `errors` array is empty or not. Just for coding convinience.

## Contributing

As this project is for the an university project, for the Compilers subject, I'll likely not keep updating it after but, anyone who finds it useful and wants to contribute or fork, is welcome to do so.
