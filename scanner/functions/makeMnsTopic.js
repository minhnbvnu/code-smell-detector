async function makeMnsTopic(topicName, properties) {
  var region = properties.Region;
  const mnsClient = await getMnsClient(topicName, region);

  // just for deepping copy
  var params = JSON.parse(JSON.stringify(properties));
  delete params.Region;

  await promiseRetry(async (retry, times) => {
    try {
      let res;
      res = await mnsClient.createTopic(topicName, params);
      console.log('mms create topic response status code = ', res.code);
    } catch (ex) {
      console.log(red(`\tretry ${times} times`));
      retry(ex);
    }
  });
}