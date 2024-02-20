function processDuplicates (prev, curr) {
  return prev.filter(({ id }) => id !== curr.id).concat(curr)
}