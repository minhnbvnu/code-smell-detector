async function getTotalUv (projectId, countAtTime, countType) {
  let record = await getRecord(projectId, countAtTime, countType)
  return _.get(record, ['total_count'], 0)
}