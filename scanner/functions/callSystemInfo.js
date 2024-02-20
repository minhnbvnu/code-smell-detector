async function callSystemInfo(config) {
    const agentMock = {
      config: {
        utilization: config
      }
    }

    return new Promise((resolve) => {
      systemInfo._getProcessorStats = () => {}
      systemInfo(agentMock, (err, result) => {
        resolve(result)
      })
    })
  }