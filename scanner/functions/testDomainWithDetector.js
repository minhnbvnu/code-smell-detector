function testDomainWithDetector (t, { domain, name, type, expected, detector, version }) {
  const value = detector.check(domain)
  // log fuzzy match for debugging
  // if (value.type === 'fuzzy') {
  //   t.comment(`"${domain}" fuzzy matches against "${value.match}"`)
  // }
  // enforcing type is optional
  if (type) {
    t.equal(value.type, type, `type: "${domain}" should be "${type}"`)
  }
  if (name) {
    t.equal(value.name, name, `name: "${domain}" should return result from config "${name}"`)
  }
  if (version) {
    t.equal(value.version, version, `version: "${domain}" should return result from config version '${version}'`)
  }
  // enforcing result is required
  t.equal(value.result, expected, `result: "${domain}" should be match "${expected}"`)
}