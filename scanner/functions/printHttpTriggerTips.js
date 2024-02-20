function printHttpTriggerTips(serverPort, serviceName, functionName, triggerName, endpoint, httpMethods, authType, domainName) {
  const prefix = domainName ? `CustomDomain ${domainName}` : `HttpTrigger ${triggerName}`;
  console.log(green(`${prefix} of ${serviceName}/${functionName} was registered`));
  console.log('\turl: ' + yellow(`http://localhost:${serverPort}${endpoint}`));
  console.log(`\tmethods: ` + yellow(httpMethods));
  console.log(`\tauthType: ` + yellow(authType));
}