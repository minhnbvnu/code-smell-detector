function extendUserContent(userContent, contentItemIndex, extendingObject, firstExtension) {
  if (extendingObject === null) return;

  const keys = Object.keys(extendingObject)
  const values = Object.values(extendingObject)

  keys.forEach((iso2, index) => {
    if (firstExtension) { // masks
      return userContent.push([iso2, values[index]])
    }

    const countryIndex = userContent.findIndex(arr => arr[0] === iso2);
    if (countryIndex === -1) {
      const newUserContent = [iso2]
      newUserContent[contentItemIndex] = values[index]
      userContent.push(newUserContent)
    } else {
      userContent[countryIndex][contentItemIndex] = values[index]
    }
  })
}