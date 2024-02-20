function isSingleByte (val) {
  return (val.length === 1 && val.charCodeAt(0) < 256)
}