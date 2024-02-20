function logsApi(serverPort, serviceName, functionName, endpoint) {
  console.log(green(`API ${serviceName}/${functionName} was registered`));
  console.log('\turl: ' + yellow(`http://localhost:${serverPort}${endpoint}/`));
}