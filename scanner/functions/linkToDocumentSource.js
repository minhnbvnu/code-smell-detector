function linkToDocumentSource(rule) {
  const link = localPathToUri(rule.file)
    .replace('lib/rules', 'docs/rules')
    .replace(/\.js$/, '.md')
  return `https://github.com/protofire/solhint/tree/master${link}`
}