function testListIsPunycode (t, list) {
  list.forEach((domain) => {
    t.equals(domain, punycode.toASCII(domain), `domain '${domain}' is encoded in punycode`)
  })
}