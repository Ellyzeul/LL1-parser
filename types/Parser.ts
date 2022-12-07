interface Parser {
  [rule: string]: {
    first: string[],
    follow: string[]
  }
}

export default Parser
