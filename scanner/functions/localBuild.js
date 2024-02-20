async function localBuild(data) {
  const runtime = data.runtime;
  const deps = pkg(data.dependencies);
  const digest = kitx.md5(`${runtime}:${deps}`, 'hex');
  var dir = `${os.tmpdir()}/${digest}`;
  try {
    fs.mkdirSync(dir);
  } catch (ex) {
    // ignore error
  }

  const pkgPath = path.join(dir, 'package.json');
  fs.writeFileSync(pkgPath, deps);
  execSync('npm i --registry=https://registry.npm.taobao.org', {
    cwd: dir
  });

  return zip(dir);
}