async function makeLogstore({
  projectName,
  logstoreName,
  ttl = 3600,
  shardCount = 1
}) {
  const sls = await getSlsClient();

  let exists = true;
  await promiseRetry(async (retry, times) => {
    try {
      await sls.getLogStore(projectName, logstoreName);
    } catch (ex) {
      if (ex.code !== 'LogStoreNotExist') {
        debug('error when getLogStore, projectName is %s, logstoreName is %s, error is: \n%O', projectName, logstoreName, ex);

        console.log(red(`\t\tretry ${times} times`));

        retry(ex);
      } else { exists = false; }
    }
  });

  if (!exists) {
    await promiseRetry(async (retry, times) => {
      try {
        await sls.createLogStore(projectName, logstoreName, {
          ttl,
          shardCount
        });
      } catch (ex) {
        if (ex.code === 'Unauthorized') {
          throw ex;
        }
        debug('error when createLogStore, projectName is %s, logstoreName is %s, error is: \n%O', projectName, logstoreName, ex);
        console.log(red(`\t\tretry ${times} times`));
        retry(ex);
      }
    });
  } else {
    await promiseRetry(async (retry, times) => {
      try {
        await sls.updateLogStore(projectName, logstoreName, {
          ttl,
          shardCount
        });
      } catch (ex) {
        debug('error when updateLogStore, projectName is %s, logstoreName is %s, error is: \n%O', projectName, logstoreName, ex);
        if (ex.code === 'Unauthorized') {
          throw ex;
        }
        if (ex.code !== 'ParameterInvalid' && ex.message !== 'no parameter changed') {
          console.log(red(`\t\tretry ${times} times`));
          retry(ex);
        } else {
          throw ex;
        }
      }
    });
  }
}