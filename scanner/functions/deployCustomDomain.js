async function deployCustomDomain(domainName, domainDefinition, routes) {
  const properties = (domainDefinition.Properties || {});
  const certConfig = properties.CertConfig || {};
  const protocol = properties.Protocol;

  if (_.isEmpty(certConfig) && protocol === 'HTTP,HTTPS') {
    throw new Error(red(`\nMust config "CertConfig" for CustomDomain "${domainName}" when using "HTTP,HTTPS" protocol.\nYou can refer to https://github.com/aliyun/fun/blob/master/docs/specs/2018-04-03-zh-cn.md#aliyunserverlesscustomdomain\nor https://github.com/aliyun/fun/blob/master/docs/specs/2018-04-03.md/#aliyunserverlesscustomdomain for help.`));
  }
  if (!_.isEmpty(certConfig) && protocol === 'HTTP') {
    throw new Error(red(`\nPlease don't use "CertConfig" config of CustomDomain "${domainName}" when using "HTTP" protocol.\nYou can refer to https://github.com/aliyun/fun/blob/master/docs/specs/2018-04-03-zh-cn.md#aliyunserverlesscustomdomain\nor https://github.com/aliyun/fun/blob/master/docs/specs/2018-04-03.md/#aliyunserverlesscustomdomain for help.`));
  }

  await makeCustomDomain({ domainName, certConfig, protocol, routeConfig: { routes } });
}