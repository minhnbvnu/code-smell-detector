function umsSysFieldSelected (array, index, umsSysField, value) {
  let newArray = copyArray(array)

  newArray = umsSysFieldCanceled(array, umsSysField)
  if (umsSysField === 'ums_id_') {
    newArray[index].ums_id_ = value
  } else if (umsSysField === 'ums_ts_') {
    newArray[index].ums_ts_ = value
  } else if (umsSysField === 'ums_op_') {
    newArray[index].ums_op_ = value
  }
  return newArray
}