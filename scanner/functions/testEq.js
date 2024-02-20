function testEq(thunk, expect) {
  it(`${toExpr(thunk)} => ${show(expect)}`, async () => {
    const actual = await thunk()
    if (!equals(actual, expect))
      throw Error(`Expected: ${show(expect)}, actual: ${show(actual)}`)

    toggleEnv()
    try {
      const actual = await thunk()
      if (!equals(actual, expect))
        throw Error(`Expected: ${show(expect)}, actual: ${show(actual)}`)
    } finally {
      toggleEnv()
    }

    L = typedL
    try {
      const typed = await thunk()
      if (!equals(actual, typed))
        throw Error(`Typed: ${show(typed)}, actual: ${show(actual)}`)
    } finally {
      L = PL
    }
  })
}