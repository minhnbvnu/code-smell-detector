function other2jsonType (array, index) {
  let newArray = copyArray(array)

  const prefix = `${newArray[index].fieldName}#`
  for (let i = index + 1; i < newArray.length; i++) {
    if (newArray[i].fieldName.startsWith(prefix)) {
      newArray[i].forbidden = false
      newArray[i].selected = true
    } else {
      break
    }
  }
  return newArray
}