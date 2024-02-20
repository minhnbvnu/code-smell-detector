async function invokeFcUtilsFunction({
  functionName,
  event
}) {
  const fc = await getFcClient();
  const rs = await fc.invokeFunction(FUN_GENERATED_SERVICE, functionName, event, {
    'X-Fc-Log-Type': 'Tail'
  });

  if (rs.data !== 'OK') {
    const log = rs.headers['x-fc-log-result'];

    if (log) {
      const decodedLog = Buffer.from(log, 'base64');
      if ((decodedLog.toString().toLowerCase()).includes('permission denied')) {
        throw new Error(`fc utils function ${functionName} invoke error, error message is: ${decodedLog}\n${red('May be UserId and GroupId in NasConfig don\'t have enough \
permission, more information please refer to https://github.com/alibaba/funcraft/blob/master/docs/usage/faq-zh.md')}`);
      }
      throw new Error(`fc utils function ${functionName} invoke error, error message is: ${decodedLog}`);
    }
  }
}