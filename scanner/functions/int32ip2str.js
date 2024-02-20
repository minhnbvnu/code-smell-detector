function int32ip2str (ip) {
  if (typeof ip === 'string') { return ip }
  ip = ip & 0xffffffff
  return [
    ip & 0xff,
    (ip & 0xff00) >> 8,
    (ip & 0xff0000) >> 16,
    (ip & 0xff000000) >> 24 & 0xff
  ].join('.')
}