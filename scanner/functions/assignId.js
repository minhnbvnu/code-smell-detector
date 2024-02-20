function assignId(shimName) {
  const id = shimIds.get(shimName)
  this.id = id || makeId()

  if (shimName && !id) {
    shimIds.set(shimName, this.id)
  }
}