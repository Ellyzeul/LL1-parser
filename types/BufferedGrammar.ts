interface BufferedGrammar {
  headRule: string, 
  rules: {
    [rule: string]: string[][]
  }
}

export default BufferedGrammar
