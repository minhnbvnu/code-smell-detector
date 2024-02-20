async function findVpc(vpcClient, region, vpcName) {

  const pageSize = 50; // max value is 50. see https://help.aliyun.com/document_detail/104577.html
  let requestPageNumber = 0;
  let totalCount;
  let pageNumber;

  let vpc;

  do {
    var params = {
      'RegionId': region,
      'PageSize': pageSize,
      'PageNumber': ++requestPageNumber
    };

    const rs = await vpcClient.request('DescribeVpcs', params, requestOption);

    totalCount = rs.TotalCount;
    pageNumber = rs.PageNumber;
    const vpcs = rs.Vpcs.Vpc;

    debug('find vpc rs: %s', rs);

    vpc = _.find(vpcs, { VpcName: vpcName });

    debug('find default vpc: %s', vpc);

  } while (!vpc && totalCount && pageNumber && pageNumber * pageSize < totalCount);

  return vpc;
}