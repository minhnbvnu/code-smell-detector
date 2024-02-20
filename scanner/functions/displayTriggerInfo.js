async function displayTriggerInfo(serviceName, functionName, triggerName, triggerType, triggerProperties, wrap, tpl) {
  if (triggerType === 'HTTP' || triggerType === 'http') {

    const profile = await getProfile();

    const accountId = profile.accountId;
    const region = profile.defaultRegion;

    const resolveWrap = wrap || '';

    if (triggerName) {
      console.log(`${resolveWrap}triggerName: ${yellow(triggerName)}`);
    }

    console.log(`${resolveWrap}methods: ${yellow(triggerProperties.Methods || triggerProperties.methods)}`);

    if (!functionBindCustomDomain(serviceName, functionName, tpl)) {
      const enable = profile.enableCustomEndpoint === true || profile.enableCustomEndpoint === 'true';
      const endpoint = enable ? profile.endpoint : `https://${accountId}.${region}.fc.aliyuncs.com`;

      console.log(`${resolveWrap}url: ` + yellow(`${endpoint}/2016-08-15/proxy/${serviceName}/${functionName}/`));
      console.log(red(`${resolveWrap}Http Trigger will forcefully add a 'Content-Disposition: attachment' field to the response header, which cannot be overwritten \n${resolveWrap}and will cause the response to be downloaded as an attachment in the browser. This issue can be avoided by using CustomDomain.\n`));
    }
  }
}