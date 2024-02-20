async function writePortFileForFcConsoleApplication(codeDir) {
  await fs.writeFile(path.join(codeDir, '.PORT'), '');
}