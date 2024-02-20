function config_nat_interface(name, replace = false) {
  return async(function* () {
    var ssh_port  = yield Utils.net.getPort();
    var ssh_natpf = ["--natpf2", "ssh,tcp,127.0.0.1," + ssh_port + ",,22"];

    if (replace) {
      // Remove and add
      yield modifyvm(name, ["--natpf2", "delete", "ssh"]);
      yield modifyvm(name, ssh_natpf);
    } else {
      yield modifyvm(name, [
        "--nic2", "nat",
        "--nictype2", "virtio",
        "--cableconnected2", "on",
        ...ssh_natpf
      ]);
    }
  });
}