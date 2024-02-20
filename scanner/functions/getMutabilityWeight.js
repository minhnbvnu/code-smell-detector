function getMutabilityWeight({ baseWeight, stateMutability }) {
  switch (stateMutability) {
    case 'constant':
    case 'view':
      return baseWeight + 2
    case 'pure':
      return baseWeight + 4
    default:
      return baseWeight
  }
}