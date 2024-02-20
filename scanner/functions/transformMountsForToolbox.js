function transformMountsForToolbox(mounts) {

  console.warn(red(`We detected that you are using docker toolbox. For a better experience, please upgrade 'docker for windows'.\nYou can refer to Chinese doc https://github.com/alibaba/funcraft/blob/master/docs/usage/installation-zh.md#windows-%E5%AE%89%E8%A3%85-docker or English doc https://github.com/alibaba/funcraft/blob/master/docs/usage/installation.md.\n`));

  if (Array.isArray(mounts)) {
    return mounts.map(m => {

      return transformSourcePathOfMount(m);
    });
  }
  return transformSourcePathOfMount(mounts);
}