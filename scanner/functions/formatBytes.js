function formatBytes(bytes, decimals) {
  if (bytes === undefined) return '?';
  if (bytes === null) return '0B';
  if (bytes === 0) return '0B';
  var k = 1024;
  var  dm = decimals < 0 ? 0 : decimals;
  var  sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  var i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}