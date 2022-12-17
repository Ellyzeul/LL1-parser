const getErrorTreatmentTokens = (first: string[], follow: string[]) => follow
  .map(follow => ({
    [follow]: first.findIndex(first => first === 'v') === -1 ? ['@'] : []
  }))
  .reduce((all, follow) => ({
    ...all,
    ...follow
  }))

export default getErrorTreatmentTokens
