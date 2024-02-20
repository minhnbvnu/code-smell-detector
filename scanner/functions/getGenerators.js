function getGenerators() {
  var generatorsMeta = env.store.getGeneratorsMeta();

  // Remove sub generators from list
  var list = _.filter(generatorsMeta, function (item) {
    return item.namespace.split(':')[1] === 'app';
  });

  list = list.map(function (item) {
    var pkgPath = findup('package.json', { cwd: item.resolved });
    if (!pkgPath) {
      return null;
    }

    var pkg = JSON.parse(fs.readFileSync(pkgPath));
    var generatorVersion = pkg.dependencies['yeoman-generator'];
    var generatorMeta = _.pick(pkg, 'name', 'version', 'description');

    // Flag generator to indecate if the generator version is fully supported or not.
    // https://github.com/yeoman/yeoman-app/issues/16#issuecomment-121054821
    generatorMeta.isCompatible = semver.ltr('0.17.6', generatorVersion);

    // Indicator to verify official generators
    generatorMeta.officialGenerator = false;
    if (generatorMeta.repository && generatorMeta.repository.url) {
      generatorMeta.officialGenerator = generatorMeta.repository.url.indexOf('github.com/yeoman/') > -1;
    }

    return generatorMeta;
  });
  return _.compact(list);
}