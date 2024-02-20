function extractFcArn(arn) {
  const [, , , , path] = arn.split(':');
  const [, serviceName, , functionName] = path.split('/');
  return {
    serviceName: evaluteExp(serviceName),
    functionName: evaluteExp(functionName)
  };
}