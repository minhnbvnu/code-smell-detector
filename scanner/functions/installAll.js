async function installAll(funcPath, { verbose, useDocker, useBuildkit }) {
  const tplPath = await detectTplPath(false);

  if (!tplPath) {
    throw new Error(red('Current folder not a fun project\nThe folder must contains template.[yml|yaml] or faas.[yml|yaml] .'));
  }

  validateTplName(tplPath);

  await validate(tplPath);

  const tpl = await getTpl(tplPath);
  const baseDir = path.dirname(tplPath);

  await buildFunction(funcPath, tpl, baseDir, useDocker, useBuildkit, ['install'], verbose);

  showInstallNextTips();
}