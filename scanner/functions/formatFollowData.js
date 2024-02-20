function formatFollowData(str) {
  if (str.indexOf('K') !== -1) {
    return parseInt(str) * 1000;
  }
  // if (str.indexOf('K') !== -1) {
  //   return parseInt(str) * 10000;
  // }
  return parseInt(str);
}