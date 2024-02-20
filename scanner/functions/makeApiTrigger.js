async function makeApiTrigger({
  serviceName,
  functionName,
  triggerName,
  method = 'GET',
  requestPath,
  restApiId
}) {
  if (!restApiId) {
    const role = await ram.makeRole('apigatewayAccessFC');
    debug('%j', role);

    const apiGroup = await makeGroup({
      name: `fc_${serviceName}_${functionName}`,
      description: `api group for function compute ${serviceName}/${functionName}`
    });

    const apiName = `fc_${serviceName}_${functionName}_${requestPath.replace(/\//g, '_')}_${method}`;

    makeApi(apiGroup, {
      stageName: 'RELEASE',
      requestPath,
      method,
      roleArn: role.Role.Arn,
      apiName,
      serviceName,
      functionName
    });
  }
}