import generateParser from "./src/generateParser";

// Using index.ts as test

console.log(generateParser({
  headRule: '<rexpr>',
  '<rexpr>':          '<rterm> <rexpr*>',
  '<rexpr*>':         '+ <rterm> <rexpr*> | v',
  '<rterm>':          '<rfactor> <rterm*>',
  '<rterm*>':         '<rfactor> <rterm*> | v',
  '<rfactor>':        '<rprimary> <rfactor*>',
  '<rfactor*>':       '* <rfactor*> | v',
  '<rprimary>':       'a | b'
}))
