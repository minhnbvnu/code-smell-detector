async function findFunctionInRosTemplate(rosTemplate, serviceName, functionName) {
  const resourceName = serviceName + functionName;
  if (rosTemplate.Resources[resourceName] && rosTemplate.Resources[resourceName].Type === ROS_FUNCTION_TYPE) {

    return {
      rosServiceName: rosTemplate.Resources[resourceName].Properties.ServiceName,
      rosFunctionName: rosTemplate.Resources[resourceName].Properties.FunctionName
    };
  }

  return {};
}