function genFinalNameAndType (array) {
  const arrayTypeRegex = new RegExp('\\#\\d+$', 'g')
  const jsonArrayTypeRegex = new RegExp('(\\#\\d+\\#)+', 'g')
  for (let i = 0; i < array.length; i++) {
    if (array[i].fieldType === 'array') {
      if (i + 1 < array.length && array[i + 1].fieldType !== JSONOBJECT) {
        array[i].fieldType = `${array[i + 1].fieldType}array`
      } else {
        array[i].fieldType = JSONARRAY
      }
    }
    if (array[i].fieldName.search(arrayTypeRegex) !== -1) {
      array.splice(i, 1)
      i = i - 1
    }
    if (array[i].fieldName.search(jsonArrayTypeRegex) !== -1) {
      array[i].fieldName = array[i].fieldName.replace(jsonArrayTypeRegex, '#')
      const subArray = array.slice(0, i)
      if (isExist(subArray, array[i].fieldName)) {
        array.splice(i, 1)
        i = i - 1
      } else {
        let position = lastPositionOfKeyPrefix(subArray, array[i].fieldName)
        if (position !== -1 && position !== i - 1) {
          array.splice(position + 1, 0, array[i])
          array.splice(i + 1, 1)
        }
      }
    }
  }
  return array
}