async function checkDirRule(codeDir, rule) {
  const paths = await parseRulePaths(codeDir, rule);

  for (const p of paths) {
    if (await fs.pathExists(p)) {
      const stat = await fs.stat(p);
      return stat.isDirectory();
    }
  }

  return false;
}