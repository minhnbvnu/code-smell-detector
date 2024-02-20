async function getClient () {
  if (process.env.KUBERNETES_CLIENT_BACKEND === 'client-node') {
    const kubeconfig = new k8s.KubeConfig()
    kubeconfig.loadFromDefault()
    const backend = new ClientNodeBackend({ kubeconfig })
    const client = new Client({ backend, version: '1.13' })
    return client
  } else {
    const client = new Client({})
    await client.loadSpec()
    return client
  }
}