function getblockhash (params) {
  return bci.blockexplorer.getBlockHeight(params.blockHeight).then(function (r) {
    return r.blocks[0].hash
  })
}