function stripProtocol(s) {
  if (s.startsWith('http://')) {
    return s.substr(7)
  }
  if (s.startsWith('https://')) {
    return s.substr(8)
  }
  return s
}