async function upsertMessage (message, suffix = '') {
  if (suffix) {
    suffix = '_' + suffix
  }
  await redis.set(`CHATGPT:MESSAGE${suffix}:${message.id}`, JSON.stringify(message))
}