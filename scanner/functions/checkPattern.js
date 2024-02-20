function checkPattern(kinds, p) {
  if (isSpread(p)) {
    throw Error('Spread patterns must be inside objects or arrays.')
  } else if (I.isArray(p)) {
    let nSpread = 0
    for (let i = 0, n = p[I.LENGTH]; i < n; ++i) {
      const pi = p[i]
      if (isSpread(pi)) {
        if (nSpread++)
          throw Error('At most one spread is allowed in an array or object.')
        checkKind(kinds, pi[PAYLOAD], arrayKind)
      } else {
        checkPattern(kinds, pi)
      }
    }
  } else if (I.isObject(p)) {
    let spread = p[PAYLOAD]
    if (spread) {
      spread = spread[0][PAYLOAD]
      checkKind(kinds, spread, objectKind)
    }
    let n = 0
    for (const k in p) {
      if (isPayload(k)) {
        if (2 < ++n)
          throw Error('At most one spread is allowed in an array or object.')
      } else {
        checkPattern(kinds, p[k])
      }
    }
  } else if (!isPrimitive(p) && !isVariable(p)) {
    throw Error('Only plain arrays and objects are allowed in patterns.')
  }
}