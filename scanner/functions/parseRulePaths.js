async function parseRulePaths(codeDir, rule) {
  const rs = [];
  const paths = rule.paths || [rule.path];
  for (const relativePath of paths) {
    if (_.isRegExp(relativePath)) {
      const pathRegex = relativePath;
      rs.push(...await listDir(codeDir, pathRegex));
    } else {
      rs.push(path.join(codeDir, resolvePath(relativePath)));
    }
  }

  return rs;
}