function generateNasServiceRes(serviceName, vpcConfig, nasConfig, zipCodePath) {
  return {
    'Type': 'Aliyun::Serverless::Service',
    'Properties': {
      'Description': `service for fc nas used for service ${serviceName}`,
      'VpcConfig': vpcConfig,
      'NasConfig': nasConfig
    },
    [constants.FUN_NAS_FUNCTION]: {
      Type: 'Aliyun::Serverless::Function',
      Properties: {
        Handler: 'index.handler',
        Runtime: 'nodejs8',
        CodeUri: zipCodePath,
        Timeout: 600,
        MemorySize: 256,
        EnvironmentVariables: {
          PATH: '/code/.fun/root/usr/bin'
        }
      },
      Events: {
        httpTrigger: {
          Type: 'HTTP',
          Properties: {
            AuthType: 'FUNCTION',
            Methods: ['POST', 'GET']
          }
        }
      }
    }
  };
}