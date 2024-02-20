function callApi (method) {
  return function (req, res) {
    var apiAction = api[method](req.guid, req.options)
    handleResponse(apiAction, res)
  }
}