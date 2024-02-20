function getAllIPAddresses() {
  const interfaces = os.networkInterfaces()
  const localRegex = /^lo/
  return Object.keys(interfaces).reduce(function gatherAddresses(addresses, key) {
    if (!localRegex.test(key)) {
      const interfaceAddresses = interfaces[key].map(function getAddress(inter) {
        return inter.address
      })

      for (let index = 0; index < interfaceAddresses.length; index++) {
        const address = interfaceAddresses[index]
        addresses.push(address)
      }
    }

    return addresses
  }, [])
}