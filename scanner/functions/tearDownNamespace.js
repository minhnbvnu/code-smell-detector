async function tearDownNamespace (options) {
  options = options || {}
  const client = options.clent || await getClient()
  const namespace = options.namespace || lastNamespace

  await client.api.v1.namespaces(namespace).delete()
}