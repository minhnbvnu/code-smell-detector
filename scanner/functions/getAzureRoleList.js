function getAzureRoleList () {
  return azureRoleList.map(item => item.roleInfo + (item?.emotion ? '-> 支持：' + Object.keys(item.emotion).join('，') + ' 情绪。' : '')).join('\n\n')
}