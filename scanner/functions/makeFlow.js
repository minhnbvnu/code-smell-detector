async function makeFlow({
  name,
  definition,
  description,
  roleArn,
  type = 'FDL'
}) {
  const client = await getFnFClient();
  let flowData;
  await promiseRetry(async (retry, times) => {
    try {
      flowData = await client.describeFlow({
        'Name': name
      });
    } catch (ex) {
      if (ex.code !== 'FlowNotExists') {
        debug('error when makeFlow, error is: \n%O', ex);
        console.log(red(`\tretry ${times} times`));
        retry(ex);
      }
    }
  });

  const params = {};

  _.forOwn({
    'Name': name,
    'Definition': definition,
    'Description': description,
    'RoleArn': roleArn,
    'Type': type
  }, (value, key) => {
    if (value) {
      params[key] = value;
    }
  });

  await promiseRetry(async (retry, times) => {
    try {
      if (!flowData) {
        flowData = await client.createFlow(params);
      } else {
        flowData = await client.updateFlow(params);
      }
    } catch (ex) {
      debug('error when createFlow or updateFlow, params is %j, error is \n%O', params, ex);

      console.log(red(`\t retry ${times} times`));
      retry(ex);
    }
  });
}