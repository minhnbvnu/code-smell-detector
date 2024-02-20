function formatResults(base, down) {
  return [
    'Field | Upstream (ms) | Downstream (ms) | Delta (ms) | Delta (%)',
    '----- | ------------: | --------------: | ---------: | --------:',
    formatField('numSamples'),
    formatField('mean'),
    formatField('stdDev'),
    formatField('max'),
    formatField('min'),
    formatField('5thPercentile'),
    formatField('95thPercentile'),
    formatField('median')
  ].join('\n')

  function formatField(field) {
    const baseValue = base[field]
    const downValue = down[field]
    const diffValue = downValue - baseValue
    const diffPercent = ((100 * diffValue) / baseValue).toFixed(2)
    const prefix = diffValue >= 0 ? '+' : ''

    return (
      `${field} | ${fixValue(baseValue)} | ${fixValue(downValue)} |` +
      ` ${fixValue(diffValue)} | ${prefix}${diffPercent}%`
    )
  }

  function fixValue(value) {
    return value % 1 ? value.toFixed(5) : value
  }
}