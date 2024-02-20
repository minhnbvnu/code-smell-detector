function getDesiredMethodProps (method) {
  return METHOD_PROPS.reduce((accumulator, currentKey) => {
    accumulator[currentKey] = method[currentKey]
    return accumulator
  }, {})
}