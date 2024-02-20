async function generateRandomIP () {
  let ip = await redis.get('CHATGPT:BING_IP')
  if (ip) {
    return ip
  }
  const baseIP = '2a12:f8c1:55:b08b::'
  const subnetSize = 254 // 2^8 - 2
  const randomIPSuffix = Math.floor(Math.random() * subnetSize) + 1
  ip = baseIP + randomIPSuffix
  await redis.set('CHATGPT:BING_IP', ip, { EX: 86400 * 7 })
  return ip
}