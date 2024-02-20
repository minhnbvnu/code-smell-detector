async function getProjectTpl(tplPath) {
  const projectBaseDir = getBaseDir(tplPath);
  const projectTplPath = path.resolve(projectBaseDir, path.basename(tplPath));
  const projectTpl = await getTpl(projectTplPath);
  return {
    projectTpl,
    projectTplPath
  };
}