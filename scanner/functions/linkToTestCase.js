function linkToTestCase(rule) {
  const link = localPathToUri(rule.file).replace('lib/rules/', '')
  return `https://github.com/protofire/solhint/tree/master/test/rules${link}`
}