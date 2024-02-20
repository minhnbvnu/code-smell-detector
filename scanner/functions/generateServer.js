function generateServer(http, api, started, responseHandler) {
  const server = http.createServer((req, res) => {
    const tx = api.agent.getTransaction()
    tx.nameState.appendPath(req.url)
    req.resume()
    responseHandler(req, res)
  })
  server.listen(() => started())
  return server
}