function _parseCodes(codes) {
  const parsedCodes = []
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i]
    if (typeof code === 'string' && code.indexOf('-') !== -1) {
      _parseRange(code, parsedCodes)
    } else {
      const parsedCode = parseInt(code, 10)
      if (!Number.isNaN(parsedCode)) {
        parsedCodes.push(parsedCode)
      } else {
        logger.warn('Failed to parse status code %s', code)
      }
    }
  }
  return parsedCodes
}