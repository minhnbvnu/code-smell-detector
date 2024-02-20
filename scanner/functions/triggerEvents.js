async function triggerEvents (client) {
  //
  // Trigger some events
  //
  for (let count = 0; count < 3; count++) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    await client.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentManifest })
    await new Promise(resolve => setTimeout(resolve, 1000))
    await cleanup(client)
  }
}