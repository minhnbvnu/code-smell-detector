function parseIPv4(ip) {
  return ip.split('.').reduce(function(lhv, rhv) {
    return (lhv << 8) | parseInt(rhv, 10);
  }, 0);
}