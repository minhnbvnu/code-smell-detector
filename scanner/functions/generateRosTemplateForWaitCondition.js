function generateRosTemplateForWaitCondition(count) {
  return {
    'WaitCondition': {
      'Type': 'ALIYUN::ROS::WaitCondition',
      'Properties': {
        'Count': count,
        'Handle': {
          'Ref': 'WaitConHandle'
        },
        'Timeout': 600
      },
      'DependsOn': 'Nas'
    },
    'WaitConHandle': {
      'Type': 'ALIYUN::ROS::WaitConditionHandle',
      'Properties': {
        'Mode': 'Full',
        'Count': -1
      }
    }
  };
}