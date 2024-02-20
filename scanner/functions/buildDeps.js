async function buildDeps(func, rootDir, type) {
  const runtime = (func.runtime || 'nodejs4.4').replace('.', '_');

  const buildType = type || process.env.BUILD_TYPE || 'remote';
  if (buildType !== 'local' && buildType !== 'remote') {
    throw new TypeError(`BUILD_TYPE must be 'local' or 'remote'.`);
  }

  // read package.json
  const pkgPath = path.join(rootDir, 'package.json');
  const hasPackageFile = await exists(pkgPath);
  if (!hasPackageFile) {
    debug('The package.json inexists in Project, skipped.');
    return;
  }

  const pkg = require(pkgPath);
  const dependencies = pkg.dependencies || {};
  if (Object.keys(dependencies).length === 0) {
    debug('The package.json has not any dependencies in Project, skipped.');
    return;
  }

  const data = {
    runtime: runtime,
    dependencies: dependencies
  };

  const stringToHash = `${runtime}:${JSON.stringify(dependencies)}`;

  const hash = kitx.md5(stringToHash, 'hex');
  const zipPath = path.join(rootDir, `node_modules_${hash}.zip`);
  const md5Path = path.join(rootDir, `node_modules_${hash}.zip.md5`);
  const hasZip = await exists(zipPath);
  const hasSign = await exists(md5Path);

  if (hasZip && hasSign) {
    const zip = await readFile(zipPath, 'base64');
    const sign = await readFile(md5Path, 'utf8');
    if (sign === kitx.md5(zip, 'hex')) {
      debug('The node_modules pre-compressed, skipped.');
      return zip;
    }
  }

  var base64;

  if (buildType === 'remote') {
    debug('build deps remotely.');
    base64 = await remoteBuild(data);
  } else {
    debug('build deps locally.');
    base64 = await localBuild(data);
  }

  debug('build %j completed.', func);
  const digest = kitx.md5(base64, 'hex');
  await writeFile(zipPath, base64, 'base64');
  await writeFile(md5Path, digest);

  return base64;
}