function checkWritePerm(stats, nasId, nasPath) {
  if (!stats.exists) {
    return undefined;
  }
  const userId = nasId.UserId;
  const groupId = nasId.GroupId;

  const mode = stats.mode;
  const nasPathUserId = stats.UserId;
  const nasPathGroupId = stats.GroupId;
  if (nasPathUserId === 0 && nasPathGroupId === 0) {
    return undefined;
  }

  // permStirng 为 ‘777’ 形式的权限形式

  let permString = (mode & parseInt('777', 8)).toString(8);
  const [ ownerCanWrite, groupCanWrite, otherCanWrite ] = _.map(permString, (perm) => hasWritePerm(parseInt(perm), stats, nasPath));

  if (!ownerCanWrite && !groupCanWrite && !otherCanWrite) {

    return `${nasPath} has no '-w-' or '-wx' permission, more information please refer to https://github.com/alibaba/funcraft/blob/master/docs/usage/faq-zh.md`;
  } else if (ownerCanWrite && groupCanWrite && otherCanWrite) {

    return undefined;
  } else if ((userId === nasPathUserId && !ownerCanWrite) && (groupId === nasPathGroupId && !groupCanWrite) && otherCanWrite) {

    return `UserId: ${nasPathUserId} and GroupId: ${nasPathGroupId} have no '-w-' or '-wx' permission to ${nasPath}, which may cause permission problem, \
more information please refer to https://github.com/alibaba/funcraft/blob/master/docs/usage/faq-zh.md`;
  } else if (!( (userId === nasPathUserId && ownerCanWrite) || (groupId === nasPathGroupId && groupCanWrite) )) {

    return `UserId: ${userId} and GroupId: ${groupId} in your NasConfig are mismatched with UserId: ${nasPathUserId} and GroupId: ${nasPathGroupId} of ${nasPath}, \
which may cause permission problem, more information please refer to https://github.com/alibaba/funcraft/blob/master/docs/usage/faq-zh.md`;
  }
  return undefined;
}