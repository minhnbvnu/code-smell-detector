function docsDirectory(projectPath, configPath) {
  const choices = readdirSync(projectPath)
    .filter((dir) => !dir.startsWith("."))
    .filter((name) => {
      const abs = join(projectPath, name);
      return isDirectory(abs) || isClioFile(name);
    });
  selectFile(projectPath, choices, configPath);
}