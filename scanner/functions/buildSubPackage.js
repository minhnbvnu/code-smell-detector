function buildSubPackage(origDir, dir, outputDirectory, npmScriptName) {
  shell.cd(dir);

  if (!fs.existsSync('package.json')) {
    return;
  }

  const subPackage = JSON.parse(
    fs.readFileSync(path.resolve('package.json'), 'utf8')
  );

  if (
    !fs.existsSync('.storybook') &&
    (!subPackage.scripts || !subPackage.scripts[npmScriptName])
  ) {
    return;
  }

  buildStorybook(subPackage, outputDirectory, npmScriptName);

  const builtStorybook = path.join(dir, outputDirectory, '*');
  const outputPath = path.join(origDir, outputDirectory, subPackage.name);

  shell.mkdir('-p', outputPath);
  shell.cp('-r', builtStorybook, outputPath);
  shell.rm('-rf', builtStorybook);

  return subPackage;
}