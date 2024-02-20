function getRenameIndex (renameArray, rename) {
  for (let i = 0; i < renameArray.length; i++) {
    if (renameArray[i].rename === rename) {
      return i
    }
  }
  return -1
}