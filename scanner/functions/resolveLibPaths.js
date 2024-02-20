async function resolveLibPaths(confdPath) {
  if (!fs.existsSync(confdPath)) {
    return [];
  }
  const confLines = await Promise.all(
    fs.readdirSync(confdPath, 'utf-8')
      .filter(f => f.endsWith('.conf'))
      .map(async f => await readLines(path.join(confdPath, f))));

  return _.flatten(confLines)
    .reduce((lines, line) => {
      // remove the first and last blanks and leave only the middle
      const found = line.match(/^\s*(\/.*)\s*$/);
      if (found && found[1].startsWith('/')) {

        lines.push(found[1]);
      }
      return lines;
    }, []);
}