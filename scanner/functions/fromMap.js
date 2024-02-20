function fromMap(map) {
  const warnings = []
  let labels = []

  Object.keys(map).forEach(function processKeys(key) {
    const type = truncate(key, 255)

    if (!map[key] || typeof map[key] !== 'string') {
      return warnings.push(
        'Label value for ' + type + 'should be a string with a length between 1 and 255 characters'
      )
    }

    const value = truncate(map[key], 255)

    if (type !== key) {
      warnings.push('Label key too long: ' + type)
    }

    if (value !== map[key]) {
      warnings.push('Label value too long: ' + value)
    }

    labels.push({ label_type: type, label_value: value })
  })

  if (labels.length > 64) {
    warnings.push('Too many Labels, list truncated to 64')
    labels = labels.slice(0, 64)
  }

  if (warnings.length) {
    try {
      warnings.unshift('Partially Invalid Label Setting: ' + stringify(map))
    } catch (err) {
      logger.debug(err, 'Failed to stringify labels')
    }
  }

  return { labels: labels, warnings: warnings }
}