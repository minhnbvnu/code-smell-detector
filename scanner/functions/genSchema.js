function genSchema (array, type) {
  const fieldsObject = {}
  const fieldsArray = []
  fieldsObject['fields'] = fieldsArray
  const selectedArray = selectedFields(array)
  for (let i = 0; i < selectedArray.length; i++) {
    if (selectedArray[i].hasOwnProperty('fieldName') && !selectedArray[i].fieldName.includes('#')) {
      let fieldArray = genBaseField(selectedArray[i], type)
      fieldArray.forEach((fieldObject) => {
        if (fieldObject.type === JSONARRAY || fieldObject.type === JSONOBJECT || fieldObject.type.startsWith('tuple')) {
          fieldObject = genSubField(array.slice(i + 1, selectedArray.length), fieldObject, '', type)
        }
        fieldsArray.push(fieldObject)
      })
    }
  }
  return fieldsObject
}