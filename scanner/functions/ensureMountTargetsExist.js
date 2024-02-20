function ensureMountTargetsExist(mountTargets) {
  if (_.isEmpty(mountTargets)) {
    throw new Error(red('Nas has not configured the mountTarget yet, please go to the console https://nas.console.aliyun.com/ to manually create the mountTarget.'));
  }
}