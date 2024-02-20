function getRepeatFieldIndex (array) {
  let newArray = copyArray(array)
  const temp = newArray.filter(s => s.selected)

  const renameArray = []
  const repeatIndexArray = []
  for (let i = 0; i < temp.length; i++) {
    const p = getRenameIndex(renameArray, temp[i].rename)

    if (p === -1) {
      const renameObj = {}
      renameObj['index'] = temp[i].key
      renameObj['rename'] = temp[i].rename
      renameArray.push(renameObj)
    } else {
      if (!repeatIndexArray.includes(temp[i].key)) {
        repeatIndexArray.push(temp[i].key)
      }
      if (!repeatIndexArray.includes(renameArray[p].index)) {
        repeatIndexArray.push(renameArray[p].index)
      }
    }
  }
  return repeatIndexArray.sort(sortNumber)
}