function testNoMatch (t, domains, options) {
  const detector = new PhishingDetector(options);

  domains.forEach((domain) => {
    testDomainWithDetector(t, {
      domain: domain,
      type: 'all',
      expected: false,
      detector,
    })
  })
}