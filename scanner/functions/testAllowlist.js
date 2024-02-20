function testAllowlist (t, domains, options) {
  const detector = new PhishingDetector(options);

  domains.forEach((domain) => {
    testDomainWithDetector(t, {
      domain: domain,
      type: options && Array.isArray(options) ? 'allowlist' : 'whitelist',
      expected: false,
      detector,
    })
  })
}