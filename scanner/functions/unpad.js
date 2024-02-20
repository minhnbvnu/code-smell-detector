function unpad (last) {
  var padded = last[15]
  if (padded < 1 || padded > 16) {
    throw new Error('unable to decrypt data')
  }
  var i = -1
  while (++i < padded) {
    if (last[(i + (16 - padded))] !== padded) {
      throw new Error('unable to decrypt data')
    }
  }
  if (padded === 16) return

  return last.slice(0, 16 - padded)
}