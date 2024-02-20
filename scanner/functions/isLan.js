function isLan(ip) {
  return belongsToSubnet(ip, LAN);
}