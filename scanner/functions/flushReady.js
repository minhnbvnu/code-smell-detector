function flushReady (ctx) {
  if (!ctx._connected) return
  while (ctx._readyEvents.length) ctx._readyEvents.shift().call(ctx)
}