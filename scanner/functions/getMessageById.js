async function getMessageById (id, suffix = '') {
  if (suffix) {
    suffix = '_' + suffix
  }
  let messageStr = await redis.get(`CHATGPT:MESSAGE${suffix}:${id}`)
  return JSON.parse(messageStr)
}