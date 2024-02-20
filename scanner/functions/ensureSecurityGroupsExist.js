function ensureSecurityGroupsExist(securityGroups) {
  if (_.isEmpty(securityGroups)) {
    throw new Error(red(`\nThere is no SecurityGroup available. You need to login to the vpc console https://ecs.console.aliyun.com/ to create one and then use 'fun deploy' to deploy your resources again.`));
  }
}