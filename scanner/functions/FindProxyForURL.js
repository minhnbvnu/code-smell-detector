function FindProxyForURL(url, host) {
  // Fallback to IP whitelist
  var remoteIP = dnsResolve(host);
  if (!remoteIP || remoteIP.indexOf(":") !== -1) {
    // resolution failed or is IPv6 addr
    return proxy;
  }
  var ip = convert_addr(remoteIP);

  if (isLan(ip) || isCN(ip)) {
    return direct;
  }

  return proxy;
}