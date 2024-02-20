function createGrpcServer(sslOptions, services, callback) {
  const server = new grpc.Server()
  for (const [, service] of services.entries()) {
    server.addService(service.serviceDefinition, service.implementation)
  }

  const { ca, authPairs } = sslOptions
  const credentials = grpc.ServerCredentials.createSsl(ca, authPairs, false)

  // Select a random port
  server.bindAsync('localhost:0', credentials, (err, port) => {
    if (err) {
      callback(err)
    }

    callback(null, port)
  })

  return server
}