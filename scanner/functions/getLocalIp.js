function getLocalIp () {
  const ifaces = os.networkInterfaces()

  let ip
  for (const key of Object.keys(ifaces)) {
    const interfaces = ifaces[key]
    for (const iface of interfaces) {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      } else {
        ip = iface.address
        break
      }
    }
    if (ip) {
      break
    }
  }

  if (!ip) {
    console.warn(`[HMR] No local IP detected. If you want to connect from a remote device, set the local IP with the 'HMR_URL' env. variable.`)
    ip = '127.0.0.1'
  } else {
    // console.warn(`[HMR] Local IP detected: '${ip}'. If you have issues connecting from a remote device, set the local IP with the 'HMR_URL' env. variable.`)
  }

  return ip
}