function generateRosTemplateForDefaultOutputs() {
  return {
    'Outputs': {
      'CurlCli': {
        'Value': {
          'Fn::GetAtt': [
            'WaitConHandle',
            'CurlCli'
          ]
        }
      },
      'Data': {
        'Value': {
          'Fn::GetAtt': [
            'WaitCondition',
            'Data'
          ]
        }
      },
      'ErrorData': {
        'Value': {
          'Fn::GetAtt': [
            'WaitCondition',
            'ErrorData'
          ]
        }
      }
    }
  };
}