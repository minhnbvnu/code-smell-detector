function testFuzzylist (t, domains, options) {
  const detector = new PhishingDetector(options);

  domains.forEach((domain) => {
    testDomainWithDetector(t, {
      domain: domain,
      type: 'fuzzy',
      expected: true,
      detector,
    })
  })
}