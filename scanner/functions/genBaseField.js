function genBaseField (fieldInfo, type) {
  const fieldArray = []
  const fieldObject = {}
  fieldObject['name'] = fieldInfo.fieldName.split('#').pop()
  fieldObject['type'] = fieldInfo.fieldType
  fieldObject['nullable'] = true
  // if (type === 'source') {
  if (fieldInfo.rename !== '' && fieldInfo.fieldName.split('#').pop() !== fieldInfo.rename) {
    fieldObject['rename'] = fieldInfo.rename
  }
  if (fieldInfo.fieldType && fieldInfo.fieldType.startsWith(TUPLE)) {
    fieldObject['type'] = TUPLE
    fieldObject['tuple_sep'] = fieldInfo.fieldType.split('##')[1]
  }
  fieldArray.push(fieldObject)
  // }
  if (type === 'source' && fieldInfo.ums_id_ || fieldInfo.ums_ts_ || (fieldInfo.ums_op_ && fieldInfo.ums_op_ !== '')) {
    const umsField = {}
    if (fieldInfo.ums_id_) {
      umsField['name'] = fieldObject.name
      umsField['type'] = fieldObject.type
      umsField['nullable'] = fieldObject.nullable
      umsField['rename'] = 'ums_id_'
    } else if (fieldInfo.ums_ts_) {
      umsField['name'] = fieldObject.name
      umsField['type'] = fieldObject.type
      umsField['nullable'] = fieldObject.nullable
      umsField['rename'] = 'ums_ts_'
    } else if (fieldInfo.ums_op_) {
      umsField['name'] = fieldObject.name
      umsField['type'] = fieldObject.type
      umsField['nullable'] = fieldObject.nullable
      umsField['rename'] = 'ums_op_'
      umsField['ums_sys_mapping'] = fieldInfo.ums_op_
    }
    fieldArray.push(umsField)
  }
  return fieldArray
}