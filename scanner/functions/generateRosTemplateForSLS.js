function generateRosTemplateForSLS(projectName, logstoreName) {
  return {
    [projectName]: {
      'Type': 'Aliyun::Serverless::Log',
      'Properties': {
        'Description': 'create by fun.',
        'Policies': [
          'AliyunLogFullAccess'
        ]
      },
      [logstoreName]: {
        'Type': 'Aliyun::Serverless::Log::Logstore',
        'Properties': {
          'TTL': 10,
          'ShardCount': 1
        }
      }
    },
    'functionLogIndex': {
      'Type': 'ALIYUN::SLS::Index',
      'Properties': {
        'ProjectName': {
          'Fn::GetAtt': [
            projectName,
            'Name'
          ]
        },
        'FullTextIndex': {
          'Enable': true,
          'IncludeChinese': true
        },
        'LogstoreName': logstoreName
      },
      'DependsOn': [projectName, `${projectName}${logstoreName}`]
    }
  };
}