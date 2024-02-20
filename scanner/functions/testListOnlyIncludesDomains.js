function testListOnlyIncludesDomains (t, domains) {
  domains.forEach((domain) => {
    if (domain.includes('/')) {
      t.fail('should be valid domain, not path')
    }
    try {
      const url = new URL(`https://${domain}`)
      t.equal(url.hostname, domain, `parsed domain name should match hostname`)
    } catch (err) {
      t.fail(`should only be valid domain, saw '${domain}'\n:${err.message}`)
    }
  })
}