async function startInstallationContainer({ runtime, imageName, codeUri, targets, context }) {
  debug(`runtime: ${runtime}`);
  debug(`codeUri: ${codeUri}`);

  if (await isDockerToolBoxAndEnsureDockerVersion()) {
    throw new Error(red(`\nWe detected that you are using docker toolbox. For a better experience, please upgrade 'docker for windows'.\nYou can refer to Chinese doc https://github.com/alibaba/funcraft/blob/master/docs/usage/installation-zh.md#windows-%E5%AE%89%E8%A3%85-docker or English doc https://github.com/alibaba/funcraft/blob/master/docs/usage/installation.md.`));
  }

  if (!imageName) {
    imageName = await dockerOpts.resolveRuntimeToDockerImage(runtime, true);
    if (!imageName) {
      throw new Error(`invalid runtime name ${runtime}`);
    }
  }

  const codeMount = await resolveCodeUriToMount(codeUri, false);

  const installMounts = conventInstallTargetsToMounts(targets);
  const passwdMount = await resolvePasswdMount();
  const mounts = _.compact([codeMount, ...installMounts, passwdMount]);

  await pullImageIfNeed(imageName);

  const envs = addInstallTargetEnv({}, targets);
  const opts = dockerOpts.generateInstallOpts(imageName, mounts, envs);

  return await startContainer(opts);
}