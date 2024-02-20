function upgradeRequest (options, cb) {
  const queryParams = qs.stringify(options.qs, { indices: false })
  const wsUrl = urljoin(options.baseUrl, options.uri, `?${queryParams}`)
  const protocol = 'base64.channel.k8s.io'

  // Passing authorization header
  options.headers = {
    ...options.headers,
    authorization: `Bearer ${options.auth.bearer}`
  }
  const ws = new WebSocket(wsUrl, protocol, options)

  const messages = []
  ws.on('message', (msg) => {
    const channel = execChannels[msg.slice(0, 1)]
    const message = Buffer.from(msg.slice(1), 'base64').toString('ascii')
    messages.push({ channel, message })
  })

  ws.on('error', (err) => {
    err.messages = messages
    cb(err, messages)
  })

  ws.on('close', (code, reason) => cb(null, {
    messages,
    body: messages.map(({ message }) => message).join(''),
    code,
    reason
  }))

  return ws
}