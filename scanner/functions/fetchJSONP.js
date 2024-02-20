function fetchJSONP(url, params) {
  return fetchJsonp(url, {
    ...params
  })
}