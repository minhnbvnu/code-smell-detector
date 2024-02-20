function tuple2other (array, index, deleteIndex) {
  let newArray = copyArray(array)

  const tupleSubFieldRegrex = new RegExp(`^${newArray[index].fieldName}#[0-9]+$`)
  for (let i = index + 1; i < newArray.length; i++) {
    if (newArray[i].fieldName.search(tupleSubFieldRegrex) !== -1) {
      if (i >= deleteIndex) {
        newArray.splice(i, 1)
        i = i - 1
      }
    } else {
      break
    }
  }
  return copyArray(newArray)
}