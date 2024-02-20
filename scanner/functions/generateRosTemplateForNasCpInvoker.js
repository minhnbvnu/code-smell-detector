function generateRosTemplateForNasCpInvoker(serviceName, bucketName, objectNames) {
  return {
    [`${serviceName}-NasCpInvoker`]: {
      'Type': 'ALIYUN::FC::FunctionInvoker',
      'DependsOn': 'MountTarget',
      'Properties': {
        'FunctionName': {
          'Fn::GetAtt': [
            'NasNasCpFunc',
            'FunctionName'
          ]
        },
        'ServiceName': {
          'Fn::GetAtt': [
            'Nas',
            'ServiceName'
          ]
        },
        'Event': {
          'Fn::Join': [
            '',
            [
              `{"dst": "/mnt/nas_dependencies/`,
              serviceName,
              '", "bucket": "',
              bucketName,
              `", "objectNames": ${JSON.stringify(objectNames)}, "rosCurl": "`,
              {
                'Fn::GetAtt': [
                  'WaitConHandle',
                  'CurlCli'
                ]
              },
              `"}`
            ]
          ]
        },
        'Async': true,
        'ExecuteVersion': 1
      }
    }
  };
}