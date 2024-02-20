function paramsToTree(dirtyParams) {
  if (!dirtyParams) {
    return null
  }

  const params = cloneDeep(dirtyParams)

  const paramIndices = params.reduce((result, { name }, index) => {
    result[name] = index
    return result
  }, {})

  return params
    .map((param) => {
      const { name, isProperty } = param

      const indexOfDot = name.indexOf('.')

      if (indexOfDot >= 0 && !isProperty) {
        const parentIndex = paramIndices[name.substring(0, indexOfDot)]
        const parent = params[parentIndex]

        param.name = name.substring(indexOfDot + 1)
        param.isProperty = true
        if (!parent.props) {
          parent.props = [param]
        } else {
          parent.props.push(param)
        }
      }

      return param
    })
    .filter((param) => !param.isProperty)
}