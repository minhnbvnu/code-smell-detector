function formatWithRanges (source, ranges, options) {
  if (!ranges || ranges.length === 0) {
    return format(source, options)
  }

  let output = source

  ranges.forEach(({ rangeStart, rangeEnd }) => {
    output = format(
      output,
      Object.assign({}, options, { rangeStart, rangeEnd })
    )
  })

  return output
}