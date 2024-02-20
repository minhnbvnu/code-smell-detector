async function loadRemoteJson (url) {
  const res = await needle('get', url).catch(err => {
    throw new Error(`Trouble loading list at "${url}":\n${err.stack}`)
  })
  if (res.statusCode !== 200) {
    throw new Error(`HTTP status ${res.statusCode} for list at "${url}":\n${res.body}`)
  }
  const result = JSON.parse(res.body)
  return result
}