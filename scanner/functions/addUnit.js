function addUnit(num, config) {
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' }
  ]

  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }

  num = (num / si[i].value).toFixed(config.decimals).replace(rx, '$1')

  return num + config.unit.replace('a', si[i].symbol)
}