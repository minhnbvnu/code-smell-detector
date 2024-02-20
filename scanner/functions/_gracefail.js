function _gracefail(errorCode, quiet) {
  if (quiet) {
    logger.debug(RUM_ISSUES[errorCode])
  } else {
    logger.warn(RUM_ISSUES[errorCode])
  }
  return '<!-- NREUM: (' + errorCode + ') -->'
}