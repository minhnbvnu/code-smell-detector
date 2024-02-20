async function processNasSelection() {
  const nasClient = await getNasPopClient();
  const nasFileSystems = await nas.getAvailableNasFileSystems(nasClient);
  ensureNasFileSystemsExist(nasFileSystems);

  const nasAnswer = await promptForFileSystems(nasFileSystems);
  const nasSelected = nasFileSystems.filter(f => f.fileSystemId === nasAnswer.fileSystemId);
  const mountTargets = _.head(nasSelected).mountTargets;
  ensureMountTargetsExist(mountTargets);

  const mountTargetAnswer = await promptForMountTargets(mountTargets);
  const mountTargetSelected = mountTargets.filter(f => f.MountTargetDomain === mountTargetAnswer.mountTargetDomain);
  const mountTarget = _.head(mountTargetSelected);

  const securityGroups = await getSecurityGroups(mountTarget.VpcId);
  ensureSecurityGroupsExist(securityGroups);

  const securityGroupAnswer = await promptForSecurityGroup(securityGroups);
  const securityGroupId = securityGroupAnswer.securityGroupId;

  return {
    mountTarget,
    securityGroupId
  };
}