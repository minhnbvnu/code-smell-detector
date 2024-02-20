function _fetchDOI (doi) {
  // ATTENTION: sendRequest uses XMLHTTPRequest, thus make sure to call it only in the browser
  if (platform.inBrowser) {
    const url = ENDPOINT + doi
    return sendRequest({ url: url, method: 'GET', header: { 'accept': 'application/vnd.citationstyles.csl+json' } })
  } else {
    return Promise.resolve('{}')
  }
}