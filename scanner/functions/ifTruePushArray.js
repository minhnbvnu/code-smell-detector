function ifTruePushArray(bool, array, dataArray) {
  if(!bool) {
    return;
  }

  dataArray.forEach(function(item) {
    ifTruePush(item, array, item);
  });
}