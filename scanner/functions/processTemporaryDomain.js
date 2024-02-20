async function processTemporaryDomain(resources, { serviceName, functionName }, protocol) {
  const profile = await getProfile();
  const region = profile.defaultRegion;
  const accountId = profile.accountId;

  const tokenRs = await sendHttpRequest('POST', TMP_DOMAIN_URL, { accountID: accountId, region });
  const token = tokenRs.token;

  const { functionRes } = definition.findFunctionByServiceAndFunctionName(resources, serviceName, functionName);

  if (_.isEmpty(functionRes)) {
    throw new Error(`could not found service/function：${serviceName}/${functionName}`);
  }

  const { tmpServiceName, tmpFunctionName, tmpTriggerName } = await makeFcUtilsFunctionTmpDomainToken(token);

  const domainRs = await sendHttpRequest('POST', TMP_DOMAIN_URL, { accountID: accountId, region, token });
  const domainName = domainRs.domain;

  await deleteFunction(tmpServiceName, tmpFunctionName, tmpTriggerName);

  const { expiredTime, timesLimit, expiredTimeObj } = await getTmpDomainExpiredTime(domainName);

  const currentTimestamp = Math.round(new Date().getTime() / 1000);

  if (expiredTime > currentTimestamp) {
    console.log(`The assigned temporary domain is ${yellow(parseProtocol(protocol, domainName))}，expired at ${yellow(date.format(expiredTimeObj, 'YYYY-MM-DD HH:mm:ss'))}, limited by ${yellow(timesLimit)} per day.`);
  } else {
    console.log(`The temporary domain ${yellow(parseProtocol(protocol, domainName))} of previous depoyment is expried.`);
  }

  return domainName;
}