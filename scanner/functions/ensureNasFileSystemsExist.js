function ensureNasFileSystemsExist(nasFileSystems) {
  if (_.isEmpty(nasFileSystems)) {
    throw new Error(red(`\nThere is no NAS file system available. You need to login to the nas console http://nas.console.aliyun.com to create one and then use 'fun deploy' to deploy your resources again.`));
  }
}