async function openaiMockServer() {
  const server = http.createServer(handler)

  return new Promise((resolve) => {
    server.listen({ host: '127.0.0.1', port: 0 }, () => {
      return resolve({
        server,
        host: server.address().address,
        port: server.address().port
      })
    })
  })
}