function initUserContent(masks, priority, areaCodes) {
  let userContent = [];
  extendUserContent(userContent, 1, masks, true)
  extendUserContent(userContent, 3, priority)
  extendUserContent(userContent, 2, areaCodes)
  return userContent;
}