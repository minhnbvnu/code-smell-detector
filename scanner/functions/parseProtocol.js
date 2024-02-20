function parseProtocol(protocol, domainName) {
  const resolveProtocol = protocol === 'HTTP' ? 'http://' : 'https://';
  return resolveProtocol + domainName;
}