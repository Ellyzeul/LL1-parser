interface BufferedGrammar {
  headRule: string, 
  rules: {
    [non_terminal: string]: string[][]
  }
}

export default BufferedGrammar
