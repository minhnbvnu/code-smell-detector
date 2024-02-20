function testAnyType (t, expected, domains, options) {
  const detector = new PhishingDetector(options);

  domains.forEach((domain) => {
    testDomainWithDetector(t, {
      domain: domain,
      expected,
      detector,
    })
  })
}