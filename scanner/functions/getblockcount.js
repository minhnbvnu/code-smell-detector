function getblockcount (params) {
  return bci.statistics.get({ stat: 'n_blocks_total' })
}