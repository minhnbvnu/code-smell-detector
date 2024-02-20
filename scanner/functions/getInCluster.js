function getInCluster () {
  const host = process.env.KUBERNETES_SERVICE_HOST
  const port = process.env.KUBERNETES_SERVICE_PORT
  if (!host || !port) {
    throw new TypeError(
      'Unable to load in-cluster configuration, KUBERNETES_SERVICE_HOST' +
      ' and KUBERNETES_SERVICE_PORT must be defined')
  }

  const ca = fs.readFileSync(caPath, 'utf8')
  const bearer = fs.readFileSync(tokenPath, 'utf8')
  const namespace = fs.readFileSync(namespacePath, 'utf8')

  return {
    url: `https://${host}:${port}`,
    ca,
    auth: { bearer },
    namespace
  }
}