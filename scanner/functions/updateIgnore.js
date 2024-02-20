async function updateIgnore(baseDir, patterns) {
  const ignoreFilePath = `${baseDir}/.funignore`;

  const fileContent = await getIgnoreContent(ignoreFilePath);

  let lines = fileContent.split(/\r?\n/);

  for (let i = 0; i < patterns.length;i++) {
    if (!_.includes(lines, patterns[i])) {
      lines.push(patterns[i]);
    }
  }

  await fs.writeFile(ignoreFilePath, lines.join('\n'));

}