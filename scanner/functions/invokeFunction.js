async function invokeFunction({
  serviceName,
  functionName,
  event,
  invocationType
}) {

  var rs;
  const fc = await getFcClient();

  if (invocationType === 'Sync') {

    rs = await fc.invokeFunction(serviceName, functionName, event, {
      'X-Fc-Log-Type': 'Tail',
      'X-Fc-Invocation-Type': invocationType
    });

    const log = rs.headers['x-fc-log-result'];

    if (log) {

      console.log(yellow('========= FC invoke Logs begin ========='));
      const decodedLog = Buffer.from(log, 'base64');
      console.log(decodedLog.toString());
      console.log(yellow('========= FC invoke Logs end ========='));

      console.log(green('\nFC Invoke Result:'));
      console.log(rs.data);
    }
  } else {

    rs = await fc.invokeFunction(serviceName, functionName, event, {
      'X-Fc-Invocation-Type': invocationType
    });

    console.log(green('✔ ') + `${serviceName}/${functionName} async invoke success.`);
  }

  return rs;
}