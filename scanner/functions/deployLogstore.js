async function deployLogstore(projectName, logstoreDefinition) {
  for (const [logstoreName, v] of Object.entries(logstoreDefinition)) {
    if ((v || {}).Type === 'Aliyun::Serverless::Log::Logstore') {
      const properties = (v || {}).Properties;
      const ttl = properties.TTL;
      const shardCount = properties.ShardCount;

      console.log(`\tWaiting for log service logstore ${logstoreName} to be deployed...`);

      await makeLogstore({
        projectName,
        logstoreName,
        ttl,
        shardCount
      });

      await deployLogstoreDefaultIndex(projectName, logstoreName);

      console.log(green(`\tlog serivce logstore ${logstoreName} deploy success`));
    }
  }
}