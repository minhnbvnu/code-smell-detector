async function nasCpFromlocalNasDirToRemoteNasDir(tpl, tplPath, baseDir, nasServiceName, nasMappings) {
  const localNasTmpDir = path.join(baseDir, '.fun', 'tmp', 'nas', 'cp');

  for (const { localNasDir, remoteNasDir } of nasMappings) {
    const srcPath = path.resolve(baseDir, localNasDir);
    const dstPath = `nas://${nasServiceName}${remoteNasDir}/`;

    console.log(yellow(`\nstarting upload ${srcPath} to ${dstPath}`));

    await nasCp(srcPath, dstPath, true, false, localNasTmpDir, tpl, tplPath, baseDir, false, true);
  }
}