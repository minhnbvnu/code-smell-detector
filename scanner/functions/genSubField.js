function genSubField (array, fieldObject, prefix, type) {
  prefix = prefix === '' ? `${fieldObject.name}#` : `${prefix}${fieldObject.name}#`

  const subFieldsArray = fieldObject.hasOwnProperty('sub_fields') ? fieldObject['sub_fields'] : []

  for (let i = 0; i < array.length; i++) {
    if (array[i].hasOwnProperty('fieldName') && array[i].fieldName.startsWith(prefix)) {
      if (array[i].fieldType !== JSONARRAY && array[i].fieldType !== JSONOBJECT && !array[i].fieldType.startsWith('tuple')) {
        const fieldArray = genBaseField(array[i], type)
        fieldArray.forEach((fieldObject) => { subFieldsArray.push(fieldObject) })
      } else {
        let object = genBaseField(array[i], type)
        object = genSubField(array.slice(i + 1, array.length), object[0], prefix, type)
        subFieldsArray.push(object)
        const step = object.hasOwnProperty('sub_fields') ? object.sub_fields.length : 0
        i = i + step
      }
    } else {
      break
    }
  }
  fieldObject['sub_fields'] = subFieldsArray
  return fieldObject
}