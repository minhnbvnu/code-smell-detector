function isProjectDir(path) {
  try {
    const projectXod = resolve(process.cwd(), path, 'project.xod');
    return statSync(projectXod).isFile();
  } catch (error) {
    return false;
  }
}