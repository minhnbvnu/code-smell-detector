function toSubst(p, k) {
  if (isPayload(k)) {
    return void 0
  } else if (void 0 === p || all1(isPrimitive, leafs, p)) {
    return I.always(p)
  } else if (isVariable(p)) {
    const i = p[PAYLOAD][0][PAYLOAD]
    return e => e[i]
  } else if (I.isArray(p)) {
    const init = []
    const rest = []
    let spread = void 0
    const n = p[I.LENGTH]
    for (let i = 0; i < n; ++i) {
      const x = p[i]
      if (isSpread(x)) {
        spread = x[PAYLOAD]
      } else {
        const side = void 0 !== spread ? rest : init
        side.push(toSubst(x))
      }
    }
    return freezeResultInDev(e => {
      const r = []
      for (let i = 0, n = init[I.LENGTH]; i < n; ++i) pushDefined(r, init[i](e))
      if (0 <= spread) {
        const xs = e[spread]
        if (xs)
          for (let i = 0, n = xs[I.LENGTH]; i < n; ++i) pushDefined(r, xs[i])
      }
      for (let i = 0, n = rest[I.LENGTH]; i < n; ++i) pushDefined(r, rest[i](e))
      return r
    })
  } else {
    let spread = p[PAYLOAD]
    if (spread) spread = spread[0][PAYLOAD]
    p = modify(values, toSubst, p)
    return freezeResultInDev(e => {
      const r = {}
      for (const k in p) setDefined(r, k, p[k](e))
      if (0 <= spread) {
        const x = e[spread]
        if (x) for (const k in x) setDefined(r, k, x[k])
      }
      return r
    })
  }
}