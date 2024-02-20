function umsSysFieldCanceled (array, umsSysField) {
  let newArray = copyArray(array)

  for (let i = 0; i < newArray.length; i++) {
    if (umsSysField === 'ums_id_') {
      newArray[i].ums_id_ = false
    } else if (umsSysField === 'ums_ts_') {
      newArray[i].ums_ts_ = false
    } else if (umsSysField === 'ums_op_') {
      newArray[i].ums_op_ = ''
    }
  }
  return newArray
}