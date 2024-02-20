function parseSyntheticsHeader(header, encKey, trustedIds) {
  let synthData = null
  try {
    synthData = JSON.parse(hashes.deobfuscateNameUsingKey(header, encKey))
    logger.trace('Parsed synthetics header: %s', synthData)
  } catch (e) {
    logger.trace(e, 'Cannot parse synthetics header: %s', header)
    return
  }

  if (!Array.isArray(synthData)) {
    logger.trace('Synthetics data is not an array.')
    return
  }

  if (synthData.length < KEYS.length) {
    logger.trace(
      'Synthetics header length is %s, expected at least %s',
      synthData.length,
      KEYS.length
    )
  }

  const [version, accountId, resourceId, jobId, monitorId] = synthData

  if (version !== 1) {
    logger.trace('Synthetics header version is not 1, got: %s', version)
    return
  }

  if (accountId && !trustedIds.includes(accountId)) {
    logger.trace(
      'Synthetics header account ID is not in trusted account IDs: %s (%s)',
      accountId,
      trustedIds.toString()
    )
    return
  }

  return {
    version,
    accountId,
    resourceId,
    jobId,
    monitorId
  }
}