function generateRosTemplateForNasConfig(serviceName, userId, groupId) {
  return {
    'UserId': userId,
    'GroupId': groupId,
    'MountPoints': [
      {
        'ServerAddr': {
          'Fn::Join': [
            '',
            [
              {
                'Ref': 'MountTarget'
              },
              ':/',
              serviceName
            ]
          ]
        },
        'MountDir': '/mnt/auto'
      }
    ]
  };
}