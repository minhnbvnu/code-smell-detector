function _partialNameFromUri(requestUrl, status) {
  const scrubbedUrl = urltils.scrub(requestUrl)

  // 0. If there is a name in the name-state stack, use it.
  let partialName = this._partialName
  let ignore = false
  if (!this.nameState.isEmpty()) {
    partialName = this.nameState.getFullName()
  }

  // 1. name set by the api
  if (this.forceName !== null) {
    partialName = this.forceName
  }

  // 2. user normalization rules (set in configuration) can override transaction
  // naming from API
  const userNormalized = this._runUserNamingRules(scrubbedUrl)
  ignore = ignore || userNormalized.ignore
  if (userNormalized.matched) {
    partialName = userNormalized.value
  }

  // 3. URL normalization rules (sent by server).
  // Nothing has already set a name for this transaction, so normalize and
  // potentially apply the URL backstop now. Only do so if no user rules matched.
  if (!partialName) {
    // avoid polluting root path when 404
    const statusName = this.nameState.getStatusName(status)
    if (statusName) {
      partialName = statusName
    } else {
      const normalized = this.agent.urlNormalizer.normalize(scrubbedUrl)
      ignore = ignore || normalized.ignore
      partialName = normalized.value
    }
  }

  return {
    ignore: ignore,
    value: partialName
  }
}