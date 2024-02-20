function hrToMillis(hr) {
  // process.hrTime gives you [second, nanosecond] duration pairs
  return hr[0] * 1e3 + hr[1] / 1e6
}