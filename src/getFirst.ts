const getFirst = (rules: {[rule: string]: string[][]}, rule: string) => {
  if(rule.charAt(0) !== '<') return [rule]
  const first = [] as string[]
  
  rules[rule].forEach(part => part[0].charAt(0) === '<'
      ? first.push(...getFirst(rules, part[0]))
      : first.push(part[0])
  )

  return first.filter((terminal, idx) => first.findIndex(testing => testing === terminal) === idx)
}

export default getFirst
