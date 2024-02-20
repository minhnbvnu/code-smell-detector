async function createMountTargetIfNotExist(nasClient, region, fileSystemId, vpcId, vswitchId) {

  let mountTargetDomain = await findMountTarget(nasClient, region, fileSystemId, vpcId, vswitchId);

  if (mountTargetDomain) {
    console.log(green('\t\tnas file system mount target is already created, mountTargetDomain is: ' + mountTargetDomain));

    return mountTargetDomain;
  }

  // create mountTarget if not exist

  console.log('\t\tcould not find default nas file system mount target, ready to generate one');

  mountTargetDomain = await createMountTarget(nasClient, region, fileSystemId, vpcId, vswitchId);

  console.log(green('\t\tdefault nas file system mount target has been generated, mount domain is: ' + mountTargetDomain));

  return mountTargetDomain;
}