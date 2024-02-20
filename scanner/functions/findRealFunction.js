function findRealFunction(rosResources, rosFunctionName) {
  const rosFunctionRes = rosResources[rosFunctionName];

  if (rosFunctionRes && rosFunctionRes.Type === 'ALIYUN::FC::Function') {

    const prop = rosFunctionRes.Properties;

    return {
      realServiceName: prop.ServiceName,
      realFunctionName: prop.FunctionName
    };
  }
  return {};
}