async function makeOtsInstance(instanceName, clusterType, description) {
  const otsPopClient = await getOtsPopClient();

  await promiseRetry(async (retry, times) => {
    try {
      try {
        await otsPopClient.request('GetInstance', {
          'InstanceName': instanceName
        });

        return;
      } catch (ex) {
        if (ex.code !== 'NotFound') {
          throw ex;
        }
      }

      await otsPopClient.request('InsertInstance', {
        InstanceName: instanceName,
        ClusterType: clusterType,
        Description: description
      }, {
        method: 'POST'
      });
    } catch (ex) {
      if (ex.code === 'AuthFailed'
        || ex.code === 'InvalidParameter'
        || ex.code === 'QuotaExhausted') {
        throw new Error(red(ex.message));
      } else {
        debug('error when makeOtsInstance, error is: \n%O', ex);

        console.error(red(`retry ${times} times`));
        retry(ex);
      }
    }
  });
}