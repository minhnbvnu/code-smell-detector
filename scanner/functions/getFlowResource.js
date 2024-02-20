async function getFlowResource(fnfName) {
  const client = await getFnFClient();
  return await client.describeFlow({
    'Name': fnfName
  });
}