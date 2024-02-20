async function processSpringBootJar(absCodeUri, jarfilePath) {
  const absJarfilePath = path.join(absCodeUri, jarfilePath);

  if (!await fs.pathExists(absJarfilePath)) {
    throw new Error('jarfile not exist ' + absJarfilePath);
  }

  if (!await isSpringBootJar(absJarfilePath)) {
    throw new Error('jarfile ' + absJarfilePath + 'is not a spring boot jar');
  }

  const tmpCodeDir = path.join(tmpDir, uuid.v4());
  await fs.ensureDir(tmpCodeDir);
  await zip.extractZipTo(absJarfilePath, tmpCodeDir);

  // todo: 先支持 fun deploy 自动生成的场景，也就是 jar 在 target 下面
  // codeUri 可能是一个 target/xxx.jar，也可能是 ./
  // 在这个场景，codeUri 不能是 target/xxx.jar，因为还要有 bootstrap
  const idx = absJarfilePath.indexOf('target/');

  if (idx < 0) {
    throw new Error('could not found target directory');
  }

  // repackage spring boot jar
  const targetAbsPath = absJarfilePath.substring(0, idx + 'target/'.length);

  if (await fs.pathExists(targetAbsPath)) {
    console.log('repackage spring boot jar file ', absJarfilePath);
    await repackPackage(tmpCodeDir,
      path.join('BOOT-INF', 'lib'),
      absJarfilePath, targetAbsPath);
  } else {
    throw new Error('target path not exist ' + targetAbsPath);
  }
}