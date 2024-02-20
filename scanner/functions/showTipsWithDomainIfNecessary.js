function showTipsWithDomainIfNecessary(tpl, domainName) {
  const customDomains = _.pickBy(tpl.Resources, (resource, key) => { return resource.Type === 'Aliyun::Serverless::CustomDomain'; });
  if (!domainName && !_.isEmpty(customDomains)) {
    showLocalStartNextTips(Object.keys(customDomains));
  }
}