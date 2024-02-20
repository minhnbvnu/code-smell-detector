function config_dhcp(net, getway, net_mask, ip) {
  return async(function* () {
    var lower_ip = ip;
    var upper_ip = ip;
    yield dhcp.ensure_hostonly_server(net, getway, net_mask, lower_ip, upper_ip);
    yield dhcp.enable_hostonly_server(net);
  });
}