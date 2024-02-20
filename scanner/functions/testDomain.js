function testDomain (t, { domain, name, type, expected, options, version }) {
  const detector = new PhishingDetector(options)
  testDomainWithDetector(t, { domain, name, type, expected, detector, version })
}