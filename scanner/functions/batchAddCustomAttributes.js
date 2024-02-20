function batchAddCustomAttributes(api, attributeCount) {
  let addedName = null
  for (let i = 0; i < attributeCount; i++) {
    addedName = `custom-${i}`
    api.addCustomAttribute(addedName, i)
  }

  return addedName
}