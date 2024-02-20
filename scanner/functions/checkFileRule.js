async function checkFileRule(codeDir, rule) {
  const paths = await parseRulePaths(codeDir, rule);
  for (const f of paths) {
    if (await fs.pathExists(f)) {
      const stat = await fs.stat(f);
      if (stat.isFile()) { return true; }
    }
  }

  return false;
}