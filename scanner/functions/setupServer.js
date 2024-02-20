function setupServer(t, sslOpts, recordSpan) {
  const packageDefinition = protoLoader.loadSync(
    __dirname + '/../../../lib/grpc/endpoints/infinite-tracing/v1.proto',
    { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
  )
  const infiniteTracingService = grpc.loadPackageDefinition(packageDefinition).com.newrelic.trace.v1

  const server = new grpc.Server()
  server.addService(infiniteTracingService.IngestService.service, { recordSpan: recordSpan })

  const { ca, authPairs } = sslOpts

  return new Promise((resolve, reject) => {
    server.bindAsync(
      'localhost:0',
      grpc.ServerCredentials.createSsl(ca, authPairs, false),
      (err, port) => {
        if (err) {
          reject(err)
        }
        server.start()
        resolve(port)
        // shutdown server when tests finish
        t.teardown(() => {
          server.tryShutdown(() => {})
        })
      }
    )
  })
}