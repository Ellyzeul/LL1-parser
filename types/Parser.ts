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
  parsing_stack?: string[],
  parseToken: (token: string) => {
    parsing_ended: boolean;
    errors: {
        expected: string[];
        got: string;
    }[];
    has_errors: boolean;
  }
}

export default Parser
