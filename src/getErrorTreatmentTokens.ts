const getErrorTreatmentTokens = (first: string[], follow: string[]) => follow
  .map(follow => {
    return {
      [follow]: first.findIndex(first => first === 'v') === -1 ? ['@'] : []
    }
  })
  .reduce((all, follow) => {
    return {
      ...all,
      ...follow
    }
  })

export default getErrorTreatmentTokens
