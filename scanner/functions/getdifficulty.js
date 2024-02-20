function getdifficulty (params) {
  return bci.statistics.get({ stat: 'difficulty' })
}