function getUserIdAndGroupId(nasConfig) {
  if (_.isEmpty(nasConfig)) { return {}; }

  if (nasConfig === 'Auto') {
    return {
      userId: 10003,
      groupId: 10003
    };
  }
  return {
    userId: nasConfig.UserId,
    groupId: nasConfig.GroupId
  };
}