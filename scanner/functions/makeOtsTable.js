async function makeOtsTable({
  instanceName,
  tableName,
  primaryKeys
}) {
  await promiseRetry(async (retry, times) => {
    try {
      const client = await getOtsClient(instanceName);

      var params = {
        tableMeta: {
          tableName: tableName,
          primaryKey: primaryKeys
        },
        reservedThroughput: {
          capacityUnit: {
            read: 0,
            write: 0
          }
        },
        tableOptions: {
          timeToLive: -1,
          maxVersions: 1
        },
        streamSpecification: {
          enableStream: true, // default true to support tablestore trigger
          expirationTime: 1
        }
      };

      const listData = await client.listTable();

      if (listData.tableNames.length > 0 && listData.tableNames.indexOf(tableName) !== -1) {
        console.log('tablestore table already exists, but could not be updated');
      } else {
        await client.createTable(params);
      }
    } catch (ex) {
      debug('error when makeOtsTable, error is: \n%O', ex);

      console.log(red(`retry ${times} times`));
      retry(ex);
    }
  });
}