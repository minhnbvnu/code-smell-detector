function testListIsContained (t, needles, stack) {
  needles.forEach((domain) => {
    if (!stack.includes(domain)) {
      t.fail(`${domain} in fuzzylist but not present in allowlist`, domain)
    }
  });
}