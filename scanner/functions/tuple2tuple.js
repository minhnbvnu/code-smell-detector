function tuple2tuple (array, index, alterType) {
  let newArray = copyArray(array)

  const preSize = Number(newArray[index].fieldType.split('##').pop())
  const alterSize = Number(alterType.split('##').pop())

  if (preSize === alterSize) {
    return newArray
  } else if (preSize > alterSize) {
    newArray = tuple2other(newArray, index, index + alterSize + 1)
    return newArray
  } else {
    newArray = other2tuple(newArray, index, preSize, alterType)
    return newArray
  }
}