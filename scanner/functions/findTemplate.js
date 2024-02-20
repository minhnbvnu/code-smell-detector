function findTemplate(repoDir) {
  debug(`Searching ${ repoDir } for project template.`);

  const files = fs.readdirSync(repoDir);
  let templateDir = '';
  files.forEach(file => {
    if (isTemplated(file)) {
      templateDir = file;
      return false;
    }
  });
  if (templateDir) {
    return templateDir;
  }
  throw new Error('Non template input dir.');
}