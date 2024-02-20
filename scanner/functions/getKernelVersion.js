async function getKernelVersion() {
  if (platform.match(/darwin/i) || platform.match(/bsd/i)) {
    return await getSysctlValue(['kern.version'])
  } else if (platform.match(/linux/i)) {
    return await getProcInfo('/proc/version')
  }

  logger.debug('Unknown platform: %s; could not read kernel version', platform)
  return null
}