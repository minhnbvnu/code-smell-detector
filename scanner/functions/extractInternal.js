function extractInternal(swarmModel) {
  return _.pick(swarmModel, '_id', 'name', 'state', 'ms')
}