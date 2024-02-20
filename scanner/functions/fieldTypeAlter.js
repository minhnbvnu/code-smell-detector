function fieldTypeAlter (array, index, alterType, type) {
  let newArray = copyArray(array)

  switch (type) {
    case 'source':
      if (array[index].fieldType.startsWith(TUPLE) && alterType.startsWith(TUPLE)) {
        newArray = tuple2tuple(newArray, index, alterType)
      } else {
        if (newArray[index].fieldType.startsWith(TUPLE)) {
          newArray = tuple2other(newArray, index, index + 1)
        } else if (newArray[index].fieldType.startsWith('json')) {
          newArray = jsonType2other(newArray, index, 'source')
        }

        if (alterType.startsWith(TUPLE)) {
          newArray = other2tuple(newArray, index, 0, alterType)
        } else if (alterType.startsWith('json')) {
          newArray = other2jsonType(newArray, index)
        }
      }
      break
    case 'sink':
      if (newArray[index].fieldType.startsWith('json')) {
        newArray = jsonType2other(newArray, index, 'sink')
      }
      if (alterType.startsWith('json')) {
        newArray = other2jsonType(newArray, index)
      }
      break
  }
  newArray[index].fieldType = alterType
  return newArray
}