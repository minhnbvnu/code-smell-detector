function getNasIdFromNasConfig(nasConfig) {
  const { userId, groupId } = definition.getUserIdAndGroupId(nasConfig);
  return {
    UserId: userId,
    GroupId: groupId
  };
}