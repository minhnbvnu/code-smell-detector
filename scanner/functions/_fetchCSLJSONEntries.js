function _fetchCSLJSONEntries (dois) {
  let errored = []
  let entries = []

  return dois.reduce((promise, doi) => {
    return promise
      .then(() => _fetchDOI(doi))
      .then(csl => entries.push(JSON.parse(csl)))
      .catch(() => errored.push(doi))
  }, Promise.resolve())
    .then(() => {
      if (errored.length > 0) {
        let err = new Error(`Could not resolve some DOI's`)
        err.dois = errored
        throw err
      } else {
        return entries
      }
    })
}