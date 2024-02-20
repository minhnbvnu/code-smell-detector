async function setupNamespace (options) {
  options = options || {}
  const client = options.client || await getClient()

  const namespace = `test-${Math.floor(Math.random() * 900000 + 100000)}`
  lastNamespace = namespace

  await client.api.v1.namespaces.post({
    body: {
      metadata: {
        name: namespace
      }
    }
  })

  return namespace
}