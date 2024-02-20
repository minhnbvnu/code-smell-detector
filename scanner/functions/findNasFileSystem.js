async function findNasFileSystem(nasClient, region, description) {

  const pageSize = 50;
  let requestPageNumber = 0;
  let totalCount;
  let pageNumber;

  let fileSystem;

  do {
    const params = {
      'RegionId': region,
      'PageSize': pageSize,
      'PageNumber': ++requestPageNumber
    };

    var rs;
    try {
      rs = await nasClient.request('DescribeFileSystems', params, requestOption);
    } catch (ex) {
      throwProcessedException(ex, 'AliyunNASFullAccess');
    }

    totalCount = rs.TotalCount;
    pageNumber = rs.PageNumber;

    const fileSystems = rs.FileSystems.FileSystem;

    fileSystem = _.find(fileSystems, { Description: description });

    debug('find filesystem: ' + JSON.stringify(fileSystem));

  } while (!fileSystem && totalCount && pageNumber && pageNumber * pageSize < totalCount);

  return (fileSystem || {}).FileSystemId;
}