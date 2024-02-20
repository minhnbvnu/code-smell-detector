function parseProcCPUInfo(data) {
  const relevantAttributes = [PROCESSOR, PHYSICAL_ID, CPU_CORES, CORE_ID]

  let processorStats = {
    logical: null,
    cores: null,
    packages: null
  }

  // In some rare cases the OS may be locked down so that you cannot retrieve this info.
  if (!data) {
    logger.debug('No CPU data to parse, returning empty stats.')
    return processorStats
  }

  // separate the processors
  let splitData = data.split('\n').map(function formatAttribute(attr) {
    return attr.split(':').map(function eliminateExtraWhitespace(s) {
      return s.replace(/\\r|\\t| {2,}/g, '').trim()
    })
  })

  const validData = splitData.filter(function checkForValidAttrs(a) {
    return a.length === 2 && relevantAttributes.indexOf(a[0]) !== -1
  })
  if (validData.length === 0) {
    logger.debug('No applicable cpu attributes found')
    return processorStats
  }

  splitData = collapseMultilineValues(splitData)

  const processors = separateProcessors(splitData)

  processorStats = countProcessorStats(processors)
  if (!processorStats.cores) {
    if (processorStats.logical === 1) {
      // some older, single-core processors might not list ids,
      // so we'll mark them 1
      processorStats.cores = 1
      processorStats.packages = 1
    } else {
      // there is no way of knowing how many packages
      // or cores there are
      processorStats.cores = null
      processorStats.packages = null
    }
  }
  return processorStats
}