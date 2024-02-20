function compareIps(ip1, ip2) {
  const r = ipToInt(ip1).compareTo(ipToInt(ip2))
  if (r === 0) {
    return 0
  } else if (r > 0) {
    return 1
  } else {
    return -1
  }
}