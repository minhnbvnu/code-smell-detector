function address(ip) {
  if (Array.from(ip).includes(':')) {
    return new Address6(ip)
  } else {
    i = new Address4(ip)
    const subnetMask = 96 + i.subnetMask
    ip = `::ffff:${i.toGroup6()}/${subnetMask}`
    return new Address6(ip)
  }
}