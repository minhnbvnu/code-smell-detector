function generateRosTemplateForDefaultResources(serviceNames, hasNasCpRes) {

  const dependsOnRoles = [...serviceNames.map(serviceName => `AliyunECSNetworkInterfaceManagementAccess${serviceName}Role`)];

  if (hasNasCpRes) {
    dependsOnRoles.push('AliyunECSNetworkInterfaceManagementAccessNasRole');
  }

  return {
    'Vpc': {
      'Type': 'ALIYUN::ECS::VPC',
      'Properties': {
        'Description': 'used for FC Application Repository',
        'CidrBlock': '10.0.0.0/8',
        'VpcName': {
          'Ref': 'ALIYUN::StackName'
        }
      }
    },
    'SecurityGroup': {
      'Type': 'ALIYUN::ECS::SecurityGroup',
      'DependsOn': dependsOnRoles,
      'Properties': {
        'SecurityGroupName': {
          'Ref': 'ALIYUN::StackName'
        },
        'VpcId': {
          'Ref': 'Vpc'
        }
      }
    },
    'VSwitch': {
      'Type': 'ALIYUN::ECS::VSwitch',
      'Properties': {
        'ZoneId': {
          'Fn::FindInMap': [
            'RegionMap',
            {
              'Ref': 'ALIYUN::Region'
            },
            'ZoneId'
          ]
        },
        'VpcId': {
          'Ref': 'Vpc'
        },
        'CidrBlock': '10.20.0.0/16'
      }
    },
    'FileSystem': {
      'Type': 'ALIYUN::NAS::FileSystem',
      'Properties': {
        'StorageType': 'Performance',
        'Description': 'used_for_fun',
        'ProtocolType': 'NFS'
      }
    },
    'MountTarget': {
      'Type': 'ALIYUN::NAS::MountTarget',
      'Properties': {
        'Status': 'Active',
        'VpcId': {
          'Ref': 'Vpc'
        },
        'NetworkType': 'Vpc',
        'VSwitchId': {
          'Ref': 'VSwitch'
        },
        'AccessGroupName': 'DEFAULT_VPC_GROUP_NAME',
        'FileSystemId': {
          'Ref': 'FileSystem'
        }
      }
    }
  };
}