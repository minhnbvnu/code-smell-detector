async function getGuardList(uid) {
  const { body } = await got_unsafe.get('http://118.25.108.153:8080/guard', {
    headers: {
      'User-Agent': `bilibili-live-tools/${uid}`
    },
    timeout: 20000,
    json: true
  })
  return body
}