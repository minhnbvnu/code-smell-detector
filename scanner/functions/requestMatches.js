function requestMatches(urlOrPredicate) {
  const predicate =
    urlOrPredicate instanceof RegExp
      ? (input) => urlOrPredicate.test(input.url)
      : typeof urlOrPredicate === 'string'
      ? (input) => input.url === urlOrPredicate
      : urlOrPredicate
  return (input, reqInit) => {
    const req = normalizeRequest(input, reqInit)
    return [predicate(req), req]
  }
}