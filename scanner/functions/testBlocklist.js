function testBlocklist (t, domains, options) {
  const detector = new PhishingDetector(options);

  domains.forEach((domain) => {
    testDomainWithDetector(t, {
      domain: domain,
      type: options && Array.isArray(options) ? 'blocklist' : 'blacklist',
      expected: true,
      detector,
    })
  })
}