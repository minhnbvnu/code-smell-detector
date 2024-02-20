function getRedisKey (baseKey, projectId, timeAt) {
  return baseKey + '_' + projectId + '_' + moment.unix(timeAt).format('YYYY-MM-DD')
}