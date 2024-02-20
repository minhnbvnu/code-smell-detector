function extractOssCodeUri(ossUri) {
  const prefixLength = 'oss://'.length;

  const index = ossUri.indexOf('/', prefixLength);

  return {
    ossBucketName: ossUri.substring(prefixLength, index),
    ossObjectName: ossUri.substring(index + 1)
  };
}