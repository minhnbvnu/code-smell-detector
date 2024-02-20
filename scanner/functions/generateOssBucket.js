async function generateOssBucket(bucketName, assumeYes) {
  const ossClient = await getOssClient();

  if (await bucketExist(ossClient, bucketName)) {
    console.log(yellow(`using oss-bucket: ${bucketName}`));
    return bucketName;
  }

  console.log(yellow(`using oss-bucket: ${bucketName}`));
  
  if (!assumeYes && (process.stdin.isTTY && !await promptForConfirmContinue('Auto generate OSS bucket for you?'))) {
    bucketName = (await promptForInputContinue('Input OSS bucket name:')).input;
  }

  await ossClient.putBucket(bucketName);

  return bucketName;
}