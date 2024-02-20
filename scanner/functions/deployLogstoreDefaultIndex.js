async function deployLogstoreDefaultIndex(projectName, logstoreName) {
  console.log(`\t\tWaiting for log service logstore ${logstoreName} default index to be deployed...`);
  await makeLogstoreIndex(projectName, logstoreName);
  console.log(green(`\t\tlog service logstore ${logstoreName} default index deploy success`));
}