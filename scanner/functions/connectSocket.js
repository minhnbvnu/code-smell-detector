function connectSocket(name, onOpen) {
  window.ipcConnect(name, function(client) {
    client.on('message', data => {
      const msg = JSON.parse(data)

      if (msg.type === 'error') {
        // Up to you whether or not to care about the error
        const { id } = msg
        replyHandlers.delete(id)
      } else if (msg.type === 'reply') {
        const { id, result } = msg

        const handler = replyHandlers.get(id)
        if (handler) {
          replyHandlers.delete(id)
          handler.resolve(result)
        }
      } else if (msg.type === 'push') {
        const { name, args } = msg

        const listens = listeners.get(name)
        if (listens) {
          listens.forEach(listener => {
            listener(args)
          })
        }
      } else {
        throw new Error('Unknown message type: ' + JSON.stringify(msg))
      }
    })

    client.on('connect', () => {
      socketClient = client

      // Send any messages that were queued while closed
      if (messageQueue.length > 0) {
        messageQueue.forEach(msg => client.emit('message', msg))
        messageQueue = []
      }

      onOpen()
    })

    client.on('disconnect', () => {
      socketClient = null
    })
  })
}