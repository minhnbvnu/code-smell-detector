function BuildCommonJs() {
  console.log('Building: '.cyan + 'npm module'.green);

  return exec(`rimraf ${libRoot}`)
    .then(() => fsp.mkdirs(libRoot))
    .then(() => buildBabel(srcRoot, libRoot))
    .then(() => console.log('Built: '.cyan + 'npm module'.green));
}