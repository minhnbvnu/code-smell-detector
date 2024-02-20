async function checkRegexRule(codeDir, rule) {
  const paths = await parseRulePaths(codeDir, rule);

  const regexContent = rule.content;
  const regex = new RegExp(regexContent, 'gm');

  for (const p of paths) {
    if (!await fs.pathExists(p)) { continue; }
    const fileContent = await fs.readFile(p);

    const match = regex.test(fileContent.toString());
    if (match) { return match; }
  }

  return false;
}