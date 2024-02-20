function BuildBower() {
  console.log('Building: '.cyan + 'bower module'.green);

  return exec(`rimraf ${bowerRoot}`)
    .then(() => fsp.mkdirs(bowerRoot))
    .then(() => Promise.all([
      bowerConfig(),
      copy(readme, bowerRoot)
    ]))
    .then(() => console.log('Built: '.cyan + 'bower module'.green));
}