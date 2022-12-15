interface Parser {
  headRule: string,
  sets: {
    [rule: string]: {
      first: string[],
      follow: string[]
    }
  },
  parsing_table: {
    [non_terminal: string]: {
      [terminal: string]: string[]
    }
  },
  parsing_stack?: string[]
}

export default Parser
