function isWorkspaceDir(path) {
  try {
    const xodworkspace = resolve(process.cwd(), path, '.xodworkspace');
    return statSync(xodworkspace).isFile();
  } catch (error) {
    return false;
  }
}