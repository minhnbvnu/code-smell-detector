function getFraction(num, decimals, separator) {
  const fraction = toFixed(num, decimals).toString().split('.')[1]

  return fraction ? separator + fraction : ''
}