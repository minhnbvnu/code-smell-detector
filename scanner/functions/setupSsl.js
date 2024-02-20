async function setupSsl() {
  const [key, certificate, ca] = await helper.withSSL()
  return {
    ca,
    authPairs: [
      {
        private_key: key,
        cert_chain: certificate
      }
    ]
  }
}