function _headerToCamelCase(header) {
  if (header.length === 0) {
    return ''
  }

  if (header.length === 1) {
    return header.toLowerCase()
  }

  const newHeader = header.charAt(0).toLowerCase() + header.slice(1)

  // Converts headers in the form 'header-name' to be in the form 'headerName'
  return newHeader.replace(/[\W_]+(\w)/g, function capitalize(m, $1) {
    return $1.toUpperCase()
  })
}