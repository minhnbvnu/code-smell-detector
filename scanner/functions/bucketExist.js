async function bucketExist(ossClient, bucketName) {
  let bucketExist = false;

  try {
    const { location } = await ossClient.getBucketLocation(bucketName);
    const { defaultRegion } = await getProfile();
    if (location !== `oss-${defaultRegion}`) {
      throw new Error(`\nThe current oss-bucket region is ${location}, which is different from the configured region ${defaultRegion}.\n`);
    }
    bucketExist = true;
  } catch (ex) {

    if (!ex.code || !_.includes(['AccessDenied', 'NoSuchBucket'], ex.code)) {
      throw ex;
    }
  }
  return bucketExist;
}