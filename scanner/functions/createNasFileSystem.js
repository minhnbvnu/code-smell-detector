async function createNasFileSystem({
  nasClient,
  region,
  storageType,
  zoneId
}) {
  const params = {
    'RegionId': region,
    'ProtocolType': 'NFS',
    'StorageType': storageType,
    'Description': NAS_DEFAULT_DESCRIPTION,
    'ZoneId': zoneId
  };

  const rs = await nasClient.request('CreateFileSystem', params, requestOption);

  return rs.FileSystemId;
}