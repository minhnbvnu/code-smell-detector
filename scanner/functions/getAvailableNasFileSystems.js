async function getAvailableNasFileSystems(nasClient) {
  const profile = await getProfile();
  const fileSystems = await getNasFileSystems(nasClient, profile.defaultRegion);
  return _.flatten(fileSystems)
    .reduce((acc, cur) => {

      if ((cur.Description || '').indexOf('cloudshell') !== -1 || _.includes(FAST_NAS_STORAGE_TYPE, cur.StorageType)) {
        return acc;
      }
      const mountTargets = cur.MountTargets || {};

      const availableMounts = [];
      for (const m of mountTargets.MountTarget) {
        if (m.Status === 'active' && m.NetworkType === 'vpc') { // 可用的, 非经典网络
          availableMounts.push(m);
        }
      }
      acc.push({
        fileSystemId: cur.FileSystemId,
        description: cur.Description,
        storageType: cur.StorageType,
        zoneId: cur.ZoneId,
        mountTargets: availableMounts
      });
      return acc;
    }, []);
}