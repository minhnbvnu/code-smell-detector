function addSeparators(num, base, thousandsSeparator, decimalSeparator) {
  const regex = /(\d+)(\d{3})/
  const string = num.toString()
  const x = string.split('.')
  let x1 = x[0]
  let x2 = x.length > 1 ? decimalSeparator + x[1] : ''

  switch (base) {
    case '':
      x1 = ''
      break
    case '0,0':
      while (regex.test(x1)) {
        x1 = x1.replace(regex, '$1' + thousandsSeparator + '$2')
      }
      break
  }

  return x1 + x2
}