async function waitVpcUntilAvaliable(vpcClient, region, vpcId) {

  let count = 0;
  let status;

  do {
    count++;

    var params = {
      'RegionId': region,
      'VpcId': vpcId
    };

    await sleep(800);

    const rs = await vpcClient.request('DescribeVpcs', params, requestOption);
    const vpcs = rs.Vpcs.Vpc;
    if (vpcs && vpcs.length) {
      status = vpcs[0].Status;

      debug('vpc status is: ' + status);
  
      console.log(`\t\tVPC already created, waiting for status to be 'Available', the status is ${status} currently`);
    }

  } while (count < 15 && status !== 'Available');

  if (status !== 'Available') { throw new Error(`Timeout while waiting for vpc ${vpcId} status to be 'Available'`); }

}