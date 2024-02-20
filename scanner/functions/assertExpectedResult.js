function assertExpectedResult({ t, data, count, keyPrefix, extraValues, legacyValues }) {
  if (semver.satisfies(pkgVersion, '<4')) {
    const expectedResult = { ok: 1, ...legacyValues }
    if (count) {
      expectedResult.n = count
    }
    t.same(data.result, expectedResult)
  } else {
    const expectedResult = { acknowledged: true, ...extraValues }
    if (count) {
      expectedResult[`${keyPrefix}Count`] = count
    }
    t.same(data, expectedResult)
  }
}