function getPlaceholder(isRobotChat) {
  switch (true) {
    case /group_chat/.test(window.location.href):
      return '支持Enter发信息/粘贴发图/@别人哦';
    case isRobotChat:
      return '支持Enter发信息哦';
    default:
      return '支持Enter发信息/粘贴发图哦';
  }
}