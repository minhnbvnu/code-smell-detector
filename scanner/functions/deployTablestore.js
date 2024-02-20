async function deployTablestore(instanceName, resourceDefinition) {
  const properties = (resourceDefinition || {}).Properties;
  if (properties) {
    const clusterType = (properties || {}).ClusterType;
    const description = (properties || {}).Description;
    await makeOtsInstance(instanceName, clusterType, description);
  }

  for (const [k, v] of Object.entries(resourceDefinition)) {
    if ((v || {}).Type === 'Aliyun::Serverless::TableStore::Table') {
      console.log(`\tWaiting for table store ${k} to be created...`);
      await makeOtsTable({
        instanceName: instanceName,
        tableName: k,
        primaryKeys: (v.Properties || {}).PrimaryKeyList.map(i => ({
          'name': i.Name,
          'type': i.Type
        }))
      });
      console.log(green(`\tcreate table store ${k} successfully`));
    }
  }
}