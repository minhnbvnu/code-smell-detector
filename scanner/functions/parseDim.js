function parseDim (result, opts, dim) {
  const layout = result.figure.layout

  if (isPositiveNumeric(opts[dim])) {
    return Number(opts[dim])
  } else if (isPositiveNumeric(layout[dim]) && !layout.autosize) {
    return Number(layout[dim])
  } else {
    return cst.dflt[dim]
  }
}