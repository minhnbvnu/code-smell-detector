async function createSdkGenerationFile (staticBucketName) {
  try {
    return await s3.headObject({ Bucket: staticBucketName, Key: 'sdkGeneration.json', ExpectedBucketOwner: process.env.SourceAccount }).promise()
  } catch (_) {
    // assume it's a NotFound error, and upload a new version
    console.log('Uploading sdkGeneration.json since it seems to not exist')
    const params = { Bucket: staticBucketName, Key: 'sdkGeneration.json', Body: '{}', ExpectedBucketOwner: process.env.SourceAccount }
    return s3.upload(params).promise()
  }
}