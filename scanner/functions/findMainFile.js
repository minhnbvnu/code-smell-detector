async function findMainFile(codeDir, fileSuffix, mainRegex) {
  const regex = new RegExp(mainRegex, 'm');

  const files = await fs.readdir(codeDir);
  for (const file of files) {
    if (!_.endsWith(file, fileSuffix)) { continue; }
    const contents = await fs.readFile(path.join(codeDir, file), 'utf8');
    if (regex.test(contents)) {
      debug('mainFile is ', file);

      return path.join(codeDir, file);
    }
  }

  return null;
}