function generateRosTemplateForEventOutputs(bucketName, objectNames, serviceName) {
  return {
    'Outputs': {
      [`${serviceName}-Event`]: {
        'Description': 'function invoke event',
        'Value': {
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
        }
      }
    }
  };
}