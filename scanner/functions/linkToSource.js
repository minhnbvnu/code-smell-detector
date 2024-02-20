function linkToSource(rule) {
  const link = localPathToUri(rule.file)
  return `https://github.com/protofire/solhint/tree/master${link}`
}