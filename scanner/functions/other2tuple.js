function other2tuple (array, index, preSize, alterType) {
  let newArray = copyArray(array)

  const size = Number(alterType.split('##').pop())
  const tupleArray = []
  for (let i = preSize; i < size; i++) {
    const object = {}
    object['fieldName'] = `${newArray[index].fieldName}#${i}`
    object['fieldType'] = 'string'
    object['selected'] = true
    object['rename'] = ''
    object['ums_id_'] = false
    object['ums_ts_'] = false
    object['ums_op_'] = ''
    object['forbidden'] = false
    tupleArray.push(object)
  }
  for (let i = 0; i < tupleArray.length; i++) {
    newArray.splice(index + preSize + i + 1, 0, tupleArray[i])
  }
  return copyArray(newArray)
}