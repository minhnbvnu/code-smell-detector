function verifyNum(num) {
  if (!+num) throw new Error('Invalid blinding data (invalid number)')
  return +num
}