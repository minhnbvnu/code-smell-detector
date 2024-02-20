async function createCatalogDirectory (staticBucketName) {
  try {
    await s3.upload({ Bucket: staticBucketName, Key: 'catalog/', Body: '', ExpectedBucketOwner: process.env.SourceAccount }).promise()
  } catch (err) {
    console.log('Error creating "catalog" directory', err)
  }
}