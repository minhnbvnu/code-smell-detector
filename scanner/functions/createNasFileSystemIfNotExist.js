async function createNasFileSystemIfNotExist(nasClient, region, zoneId, storageType) {
  let fileSystemId = await findNasFileSystem(nasClient, region, NAS_DEFAULT_DESCRIPTION);

  if (!fileSystemId) {
    console.log('\t\tcould not find default nas file system, ready to generate one');

    fileSystemId = await createNasFileSystem({ nasClient, region, zoneId, storageType });

    console.log(green('\t\tdefault nas file system has been generated, fileSystemId is: ' + fileSystemId));
  } else {
    console.log(green('\t\tnas file system already generated, fileSystemId is: ' + fileSystemId));
  }

  return fileSystemId;
}