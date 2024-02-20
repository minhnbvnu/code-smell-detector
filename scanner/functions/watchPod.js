function watchPod (pod) {
  const podClient = client.api.v1.namespaces(namespace).pods(pod)
  const stream = podClient.log.getStream({ qs: { follow: true } })
  const jsonStream = new JSONStream()
  stream.pipe(jsonStream)

  jsonStream.on('data', async object => {
    console.log('Log event:', JSON.stringify(object, null, 2))
    if (object.level === 'error') {
      console.warn(`Error in ${pod}`)
      await podClient.patch({
        body: {
          metadata: {
            labels: {
              state: 'failed'
            }
          }
        }
      })
      stream.abort()
    }
  })

  //
  // Watch logs for 60 seconds.
  //
  const timeout = setTimeout(() => stream.abort(), 60 * 1000)
  jsonStream.on('end', () => clearTimeout(timeout))
}