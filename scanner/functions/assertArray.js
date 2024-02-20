function assertArray(res, expectations) {
  expect(res.length).toBe(expectations.length)
  expectations.forEach(function (exp, i) {
    expect(exp).toBe(res[i])
  })
}