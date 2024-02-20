function config_net_interfaces(name, ip, use_dhcp) {
  return async(function* () {
    var result = yield exec("hostonlyif", "create");
    var inter  = result.match(/Interface '(.*)?'/)[1];

    yield modifyvm(name, [
      "--nic1", "hostonly",
      "--nictype1", "virtio",
      "--cableconnected1", "on",
      "--hostonlyadapter1", inter
    ]);

    // Configure dhcp server
    var gateway = Utils.net.calculateGatewayIp(ip);
    var network = Utils.net.calculateNetIp(ip);
    var netmask = "255.255.255.0";

    // nat interfance
    yield config_nat_interface(name);
    yield hostonly.configure_if(inter, gateway, netmask);

    // dhcp server
    if (use_dhcp) {
      yield config_dhcp(inter, gateway, netmask, ip);
    } else {
      var key_base = "/VirtualBox/D2D/eth0";
      return thenAll([
        guestproperty.set(name, `${key_base}/address`, ip),
        guestproperty.set(name, `${key_base}/netmask`, netmask),
        guestproperty.set(name, `${key_base}/network`, network),
      ]);
    }
  });
}