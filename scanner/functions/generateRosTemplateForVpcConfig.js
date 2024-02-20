function generateRosTemplateForVpcConfig() {
  return {
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
  };
}