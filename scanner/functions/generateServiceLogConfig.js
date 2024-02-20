function generateServiceLogConfig(projectName, logstoreName) {
  return {
    'Project': {
      'Fn::GetAtt': [
        projectName,
        'Name'
      ]
    },
    'Logstore': logstoreName
  };
}