function getNetworkAddress() {
  for (const name of Object.keys(interfaces)) {
    for (const ifc of interfaces[name]) {
      const { address, family, internal } = ifc;
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
}