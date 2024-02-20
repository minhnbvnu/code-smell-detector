async function getSysctlValue(names = []) {
  let returnValue = null

  for (const name of names) {
    // returnValue being set means we already found what we were looking for, early exit for performance
    if (returnValue) {
      break
    }

    try {
      const { stderr, stdout } = await execFile('sysctl', ['-n', name])

      if (!stderr) {
        returnValue = stdout
      }
    } catch (err) {
      logger.debug('Error when trying to run: sysctl -n %s: %s', name, err.message)
    }
  }

  if (returnValue === null) {
    logger.debug('No sysctl info found for names: %j', names)
  }

  return returnValue
}