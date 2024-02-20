async function getPublicIP () {
  try {
    if (localIP === '') {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      localIP = data.ip
    }
    return localIP
  } catch (err) {
    return '127.0.0.1'
  }
}