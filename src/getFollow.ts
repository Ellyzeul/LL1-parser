import getFirst from "./getFirst"

const getFollow = (headRule: string, rules: {[rule: string]: string[][]}, rule: string, inspected: {[key: string]: string[]}) => {
  const follow = [] as string[]
  const { [rule]: _, ...toInspect } = rules

  inspected[rule] = []

  Object.keys(toInspect).forEach(inspectingRule => 
    toInspect[inspectingRule].forEach(part => {
      const ruleIdx = part.findIndex(testing => testing === rule)

      rule === headRule && follow.push('$')
      if(ruleIdx === -1) return

      const nextRule = part[ruleIdx + 1] || inspectingRule
      const usingLeftSide = !part[ruleIdx + 1]
      nextRule !== inspectingRule && follow.push(...getFirst(rules, nextRule))
      const emptyIdx = follow.findIndex(terminal => terminal === 'v')

      if(emptyIdx !== -1 || usingLeftSide) {
        follow.splice(emptyIdx, 1)
        follow.push(...(!!inspected[nextRule]
          ? inspected[nextRule]
          : getFollow(headRule, rules, nextRule, inspected)
        ))
      }
    })
  )

  inspected[rule] = follow.filter((terminal, idx) => follow.findIndex(testing => testing === terminal) === idx)

  return inspected[rule]
}

export default getFollow
