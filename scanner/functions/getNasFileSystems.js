async function getNasFileSystems(nasClient, region) {
  const pageSize = 50;
  let requestPageNumber = 0;
  let totalCount;
  let pageNumber;

  let fileSystems = [];

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

    fileSystems.push((rs.FileSystems || {}).FileSystem);

    debug('find fileSystems: ' + JSON.stringify(fileSystems));

  } while (totalCount && pageNumber && pageNumber * pageSize < totalCount);

  return fileSystems;
}