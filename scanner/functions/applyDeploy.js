async function applyDeploy () {
  const client = new Client({ config: config.fromKubeconfig(), version: '1.13' })

  try {
    const create = await client.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentManifest })
    console.log('Create:', create)
  } catch (err) {
    if (err.code !== 409) throw err
    const replace = await client.apis.apps.v1.namespaces('default').deployments('nginx-deployment').put({ body: deploymentManifest })
    console.log('Replace:', replace)
  }
}