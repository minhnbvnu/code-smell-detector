function renameAlter (array, index, rename) {
  let newArray = copyArray(array)
  newArray[index].rename = rename
  return newArray
}