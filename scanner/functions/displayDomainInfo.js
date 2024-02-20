function displayDomainInfo(path, domainName, triggerName, triggerProperties) {
  console.log(`triggerName: ${yellow(triggerName)}`);
  console.log(`methods: ${yellow(triggerProperties.Methods || triggerProperties.methods)}`);
  console.log(`url: ` + yellow(generateUri(path, domainName)));
}