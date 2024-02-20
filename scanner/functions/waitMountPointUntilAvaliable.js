async function waitMountPointUntilAvaliable(nasClient, region, fileSystemId, mountTargetDomain) {
  let count = 0;
  let status;

  do {
    count++;

    var params = {
      'RegionId': region,
      'FileSystemId': fileSystemId,
      'MountTargetDomain': mountTargetDomain
    };

    await sleep(800);

    const rs = await nasClient.request('DescribeMountTargets', params, requestOption);
    status = rs.MountTargets.MountTarget[0].Status;

    debug('nas status is: ' + status);

    console.log(`\t\tnas mount target domain already created, waiting for status to be 'Active', now is ${status}`);
  } while (count < 15 && status !== 'Active');

  if (status !== 'Active') { throw new Error(`Timeout while waiting for MountPoint ${mountTargetDomain} status to be 'Active'`); }
}