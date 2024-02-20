function watchDeploymentNotifiers (client) {
  const stream = client.apis['kubernetes-client.io'].v1.watch.deploymentnotifiers.getStream()
  const jsonStream = new JSONStream()
  stream.pipe(jsonStream)

  const watchers = {}
  jsonStream.on('data', async event => {
    const id = `${event.object.metadata.namespace}/${event.object.metadata.name}`
    if (event.type === 'ADDED') {
      //
      // Watch the Deployment for each DeploymentNotifier.
      //
      watchers[id] = watchDeployment(client, event.object)
    } else if (event.type === 'DELETED') {
      watchers[id].abort()
      delete watchers[id]
    }
  })
}