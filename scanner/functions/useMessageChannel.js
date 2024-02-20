function useMessageChannel () {
    var channel = new MessageChannel()
    channel.port1.onmessage = flush
    return function () {
      return channel.port2.postMessage(0)
    }
  }