function parseProcMeminfo(data) {
  // In some rare cases the OS may be locked down so that you cannot retrieve this info.
  if (!data) {
    logger.debug('No memory data to parse.')
    return null
  }

  const memTotal = parseInt(data.replace(/MemTotal:\s*(\d*)\skB/, '$1'), 10)

  if (memTotal) {
    return memTotal / 1024
  }

  logger.debug('Unable to parse memory string:', data)
  return null
}