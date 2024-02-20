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