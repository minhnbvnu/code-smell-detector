function _getBibEntries (dois) {
  return _fetchCSLJSONEntries(dois).then(entries => {
    let conversionErrors = []
    let convertedEntries = []
    entries.forEach(entry => {
      try {
        convertedEntries.push(
          convertCSLJSON(entry)
        )
      } catch (error) {
        conversionErrors.push(entry.DOI)
      }
    })
    if (conversionErrors.length > 0) {
      let error = new Error('Conversion error')
      error.dois = conversionErrors
      return Promise.reject(error)
    } else {
      return convertedEntries
    }
  })
}