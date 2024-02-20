function parseSyntheticsInfoHeader(header, encKey) {
  let synthInfoData = null
  try {
    synthInfoData = JSON.parse(hashes.deobfuscateNameUsingKey(header, encKey))
    logger.trace('Parsed synthetics info header: %s', synthInfoData)
  } catch (e) {
    logger.trace(e, 'Cannot parse synthetics info header: %s', header)
    return
  }

  if (!isNotEmpty(synthInfoData)) {
    logger.trace('Synthetics info data is not an object.')
    return
  }

  const { version } = synthInfoData

  if (version !== 1) {
    logger.trace('Synthetics info header version is not 1, got: %s', version)
    return
  }

  return synthInfoData
}