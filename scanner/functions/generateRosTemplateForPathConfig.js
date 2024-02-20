function generateRosTemplateForPathConfig(serviceName, functionName) {
  return {
    'ServiceName': {
      'Fn::GetAtt': [
        serviceName,
        'ServiceName'
      ]
    },
    'FunctionName': {
      'Fn::GetAtt': [
        serviceName + functionName,
        'FunctionName'
      ]
    }
  };
}