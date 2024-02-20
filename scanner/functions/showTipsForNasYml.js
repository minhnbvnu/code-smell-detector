function showTipsForNasYml(baseDir, serviceNasMappings) {
  if (_.isEmpty(serviceNasMappings)) { return; }

  const localNasDir = [];
  _.forEach(serviceNasMappings, (nasMappings, key) => {
    for (const nasMapping of nasMappings) {
      localNasDir.push(path.resolve(baseDir, nasMapping.localNasDir));
    }
  });
  console.log(yellow(`
===================================== Tips for nas resources ==================================================
Fun has detected the .nas.yml file in your working directory, which contains the local directory:

        ${localNasDir.join('\n\t')}
  `));
  console.log(yellow(`The above directories will be automatically ignored when 'fun deploy'.
Any content of the above directories changes，you need to use 'fun nas sync' to sync local resources to remote.
===============================================================================================================`));
}