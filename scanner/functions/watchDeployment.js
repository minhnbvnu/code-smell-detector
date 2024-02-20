function watchDeployment (client, notifier) {
  let version = '(none)'
  const stream = client.apis.apps.v1beta.watch.ns('default').deploy(notifier.deploymentName).getStream()
  const jsonStream = new JSONStream()
  stream.pipe(jsonStream)

  jsonStream.on('data', async event => {
    const newVersion = event.object.spec.template.spec.containers.map(container => container.image).join(',')
    //
    // Simple "notification": log to the console. A better option could be
    // calling the New Relic Deployment API or GithHub Deloyment Status or ...
    //
    console.log(`DeploymentNotifier ${notifier.metadata.name}: ${event.object.metadata.name} ${event.type}`)
    if (version !== newVersion) {
      console.log(`${version} -> ${newVersion}`, JSON.stringify(notifier.notify, null, 2))
      version = newVersion
    }
  })

  return stream
}