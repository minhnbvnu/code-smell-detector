function getblock (params) {
  return bci.blockexplorer.getBlock(params.blockHash).then(function (block) {
    return {
      tx: block.tx.map(pluck('hash')),
      time: block.time,
      height: block.height,
      nonce: block.nonce,
      hash: block.hash,
      bits: block.bits,
      merkleroot: block.mrkl_root,
      version: block.ver,
      size: block.size
    }
  })
}