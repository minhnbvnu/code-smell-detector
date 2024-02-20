async function retryUntilSlsCreated(serviceName, options, create, fcClient) {
  let slsRetry = 0;
  let retryTimes = 12;
  let service;
  do {
    try {
      if (create) {
        debug('create service %s, options is %j', serviceName, options);
        service = await fcClient.createService(serviceName, options);
      } else {
        debug('update service %s, options is %j', serviceName, options);
        service = await fcClient.updateService(serviceName, options);
      }
      return service;
    } catch (e) {
      if (isSlsNotExistException(e)) {
        slsRetry++;

        if (slsRetry >= retryTimes) {
          throw e;
        }

        await sleep(3000);
      } else { throw e; }
    }
  } while (slsRetry < retryTimes);
}