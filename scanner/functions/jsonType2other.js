function jsonType2other (array, index, type) {
  let newArray = copyArray(array)

  const prefix = `${newArray[index].fieldName}#`
  for (let i = index + 1; i < newArray.length; i++) {
    switch (type) {
      case 'source':
        if (newArray[i].fieldName.startsWith(prefix)) {
          newArray[i].forbidden = true
          newArray[i].selected = false
          newArray[i].ums_id_ = false
          newArray[i].ums_ts_ = false
          newArray[i].ums_op_ = ''
        } else {
          break
        }
        break
      case 'sink':
        if (newArray[i].fieldName.startsWith(prefix)) {
          newArray[i].forbidden = true
          newArray[i].selected = false
        } else {
          break
        }
        break
    }
  }
  return newArray
}