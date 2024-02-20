async function getSourceArn(triggerType, triggerProperties) {
  const profile = await getProfile();

  if (triggerType === 'Log') {
    return `acs:log:${profile.defaultRegion}:${profile.accountId}:project/${triggerProperties.LogConfig.Project}`;
  } else if (triggerType === 'RDS') {
    return `acs:rds:${profile.defaultRegion}:${profile.accountId}:dbinstance/${triggerProperties.InstanceId}`;
  } else if (triggerType === 'MNSTopic') {
    if (triggerProperties.Region !== undefined) {
      return `acs:mns:${triggerProperties.Region}:${profile.accountId}:/topics/${triggerProperties.TopicName}`;
    }
    return `acs:mns:${profile.defaultRegion}:${profile.accountId}:/topics/${triggerProperties.TopicName}`;
  } else if (triggerType === 'TableStore') {
    return `acs:ots:${profile.defaultRegion}:${profile.accountId}:instance/${triggerProperties.InstanceName}/table/${triggerProperties.TableName}`;
  } else if (triggerType === 'OSS') {
    return `acs:oss:${profile.defaultRegion}:${profile.accountId}:${triggerProperties.BucketName || triggerProperties.bucketName}`;
  } else if (triggerType === 'CDN') {
    return `acs:cdn:*:${profile.accountId}`;
  }
  return;
}