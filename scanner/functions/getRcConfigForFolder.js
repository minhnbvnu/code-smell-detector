function getRcConfigForFolder(cwd) {
  const filePath = (0, (_path || _load_path()).resolve)(cwd, '.yarnrc');
  if (!(0, (_fs || _load_fs()).existsSync)(filePath)) {
    return {};
  }

  const fileText = (0, (_fs || _load_fs()).readFileSync)(filePath, 'utf8');
  return loadRcFile(fileText, filePath);
}