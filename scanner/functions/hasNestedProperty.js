function hasNestedProperty(object, descendants) {
  const arrayDescendants = descendants.split('.')

  let currentItem = object
  for (let i = 0; i < arrayDescendants.length; i++) {
    const property = arrayDescendants[i]

    if (!currentItem || !currentItem.hasOwnProperty(property)) {
      return false
    }

    currentItem = currentItem[property]
  }

  return true
}