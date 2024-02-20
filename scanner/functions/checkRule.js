async function checkRule(codeDir, rule) {
  const type = rule.type;

  switch (type) {
  case 'json':
    return await checkJsonRule(codeDir, rule);
  case 'regex':
    return await checkRegexRule(codeDir, rule);
  case 'contains':
    return await checkContainsRule(codeDir, rule);
  case 'dir':
    return await checkDirRule(codeDir, rule);
  case 'file':
    return await checkFileRule(codeDir, rule);
  default:
    throw new Error(`rule type ${type} not supported`);
  }
}