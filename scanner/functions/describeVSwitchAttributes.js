async function describeVSwitchAttributes(vpcClient, region, vswitchId) {
  const params = {
    'RegionId': region,
    'VSwitchId': vswitchId
  };
  return await vpcClient.request('DescribeVSwitchAttributes', params, requestOption);
}