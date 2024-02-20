async function makeLogstoreIndex(projectName, logstoreName) {
  const sls = await getSlsClient();

  // create index if index not exist.
  await promiseRetry(async (retry, times) => {
    try {
      try {
        await sls.getIndexConfig(projectName, logstoreName);
        return;
      } catch (ex) {
        if (ex.code !== 'IndexConfigNotExist') {
          debug('error when getIndexConfig, projectName is %s, logstoreName is %s, error is: \n%O', projectName, logstoreName, ex);

          throw ex;
        }
      }

      // create default logstore index. index configuration is same with sls console.
      debug('logstore index not exist, try to create a default index for project %s logstore %s', projectName, logstoreName);
      await sls.createIndex(projectName, logstoreName, {
        ttl: 10,
        line: {
          caseSensitive: false,
          chn: false,
          token: [...', \'";=()[]{}?@&<>/:\n\t\r']
        }
      });
      debug('create default index success for project %s logstore %s', projectName, logstoreName);
    } catch (ex) {
      debug('error when createIndex, projectName is %s, logstoreName is %s, error is: \n%O', projectName, logstoreName, ex);

      console.log(red(`\t\t\tretry ${times} times`));
      retry(ex);
    }
  });
}