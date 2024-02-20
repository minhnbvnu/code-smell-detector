function requestNotMatches(urlOrPredicate) {
  const matches = requestMatches(urlOrPredicate)
  return (input) => {
    const result = matches(input)
    return [!result[0], result[1]]
  }
}