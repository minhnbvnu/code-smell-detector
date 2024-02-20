function isIpInAnyRange(ip, blocks) {
  for (let block of Array.from(blocks)) {
    if (isIpInRange(ip, block)) {
      return true
    }
  }
  return false
}