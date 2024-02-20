function checkKind(kinds, i, kind) {
  if (0 <= i) {
    if (kinds[i]) {
      if (kinds[i] !== kind)
        throw Error(
          'Spread patterns must be used consistently either as arrays or as objects.'
        )
    } else {
      kinds[i] = kind
    }
  }
}