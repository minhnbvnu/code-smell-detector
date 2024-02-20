function mockIpAddresses(values) {
  os.networkInterfaces = () => {
    return {
      en0: values.reduce((interfaces, address) => {
        interfaces.push({ address })
        return interfaces
      }, [])
    }
  }
}