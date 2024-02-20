function getJumpToLatestTabOnClose() {
  var s = localStorage["jumpTo_latestTab_onClose"];
  return s ? s === 'true' : false;
}