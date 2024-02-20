async function checkContainsRule(codeDir, rule) {
  const paths = await parseRulePaths(codeDir, rule);
  const content = rule.content;
  for (const p of paths) {
    if (!await fs.pathExists(p)) { continue; }
    const fileContent = await fs.readFile(p, 'utf8');

    if (_.includes(fileContent, content)) { return true; }
  }

  return false;
}