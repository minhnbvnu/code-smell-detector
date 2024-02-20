function skipTestsWithKnownIssues () {
  // TODO find how to REALLY skip tests - currently does not
  // take suite chain into account, thus just hides the
  // tests with known issues
  const removeCommas = s => s.replace(/,/g, '')
  const issueNames = knownIssues
    .map(Cypress._.toLower)
    .filter(name => name.includes(framework))
    .map(removeCommas)
  console.log('framework %s has %d issue(s)', framework, issueNames.length)

  const realIt = window.it
  window.it = function (name, cb) {
    if (typeof name === 'function') {
      // using it(cb) form without title
      cb = name
      name = cb.name
    }
    if (!cb) {
      // nothing to do - skipped test, just title
      return
    }
    name = name.toLowerCase()
    const issue = issueNames.find(issueName => issueName.endsWith(name))
    if (issue) {
      console.log('test "%s" has a known issue', name)
      return realIt.skip(name, cb)
    } else {
      return realIt.apply(null, arguments)
    }
  }
  window.it.skip = realIt.skip
  window.it.only = realIt.only
}