function generateRosTemplateForNasService(ossCodeUri) {
  return {
    'Nas': {
      'Type': 'Aliyun::Serverless::Service',
      'Properties': {
        'Description': 'download dependences from oss and upload to nas.',
        'Policies': [
          'AliyunOssFullAccess'
        ],
        'VpcConfig': {
          'VpcId': {
            'Ref': 'Vpc'
          },
          'VSwitchIds': [
            {
              'Ref': 'VSwitch'
            }
          ],
          'SecurityGroupId': {
            'Ref': 'SecurityGroup'
          }
        },
        'NasConfig': {
          'UserId': 10003,
          'GroupId': 10003,
          'MountPoints': [
            {
              'ServerAddr': {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Ref': 'MountTarget'
                    },
                    ':/'
                  ]
                ]
              },
              'MountDir': '/mnt/nas_dependencies'
            }
          ]
        }
      },
      'NasCpFunc': {
        'Type': 'Aliyun::Serverless::Function',
        'Properties': {
          'Handler': 'index.cpFromOssToNasHandler',
          'Runtime': 'nodejs8',
          'CodeUri': ossCodeUri,
          'MemorySize': 3072,
          'Timeout': 300
        }
      }
    }
  };
}