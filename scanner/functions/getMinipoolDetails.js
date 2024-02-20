async function getMinipoolDetails(index) {
    const minipoolAddress = await rocketMinipoolManager.getNodeMinipoolAt(nodeAddress, index);
    const minipool = await RocketMinipoolDelegate.at(minipoolAddress)
    return Promise.all([
      minipool.getStatus(),
      minipool.getNodeFee()
    ]).then(
      ([status, fee]) => ({
        status: new web3.utils.BN(status),
        fee: new web3.utils.BN(fee)
      })
    )
  }