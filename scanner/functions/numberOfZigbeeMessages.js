function numberOfZigbeeMessages (body = {}) {
  let n = 0
  if (Object.keys(body).includes('on')) {
    n++
  }
  if (
    Object.keys(body).includes('bri') ||
    Object.keys(body).includes('bri_inc')
  ) {
    n++
  }
  if (
    Object.keys(body).includes('xy') ||
    Object.keys(body).includes('ct') ||
    Object.keys(body).includes('hue') ||
    Object.keys(body).includes('sat') ||
    Object.keys(body).includes('effect')
  ) {
    n++
  }
  return n === 0 ? 1 : n
}