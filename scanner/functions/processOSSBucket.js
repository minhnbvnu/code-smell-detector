async function processOSSBucket(bucket, assumeYes) {
  if (!bucket) {
    const profile = await getProfile();
    const defalutBucket = `fun-gen-${profile.defaultRegion}-${profile.accountId}`;
    return await generateOssBucket(defalutBucket, assumeYes);
  }
  return await generateOssBucket(bucket, assumeYes);
}