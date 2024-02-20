function pushSet(set1, set2) {
  invariant(set2, 'Set to push into must be defined.')
  if(!set1) return
  for(let value of set1) {
    set2.add(value)
  }
}