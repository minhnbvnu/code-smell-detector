function falsyString (value) {
  switch (typeof value) {
    case `undefined`:
      return `undefined`
    case `false`:
      return `false`
    case `string`:
      return value.length ? value : `""`
    default:
      return false
  }
}