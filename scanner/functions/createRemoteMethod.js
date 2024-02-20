function createRemoteMethod(port) {
  const config = {
    ssl: true,
    max_payload_size_in_bytes: 1000000,
    feature_flag: {}
  }

  const endpoint = {
    host: SSL_HOST,
    port: port
  }

  config.certificates = [read(join(__dirname, '../lib/ca-certificate.crt'), 'utf8')]

  const agent = { config, metrics: { measureBytes() {} } }
  return new RemoteMethod('fake', agent, endpoint)
}