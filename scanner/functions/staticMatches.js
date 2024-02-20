function staticMatches(value) {
  return (input, reqInit) => {
    return [value, normalizeRequest(input, reqInit)]
  }
}