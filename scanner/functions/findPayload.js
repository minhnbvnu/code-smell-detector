function findPayload(args) {
  for (let i = 0; i < args.length; ++i) {
    const arg = args[i]
    if (typeof arg === 'string') {
      return JSON.parse(arg)
    }
  }
}