async function main() {
  const pkg = await fse.readJSON(path.resolve(baseDir, '../package.json'));

  // update the version number in util.js
  const utilPath = path.join(buildDir, 'util.js');
  let utilSrc = await fse.readFile(utilPath, 'utf-8');
  let replaced = 0;
  utilSrc = utilSrc.replace(/(?<=const VERSION = ')(?:[^']*)(?=';)/g, () => {
    replaced++;
    return pkg.version;
  });
  if (replaced !== 1) {
    throw new Error('Failed to replace version');
  }
  await fse.writeFile(utilPath, utilSrc, 'utf-8');
}