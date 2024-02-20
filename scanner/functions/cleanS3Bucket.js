async function cleanS3Bucket (bucketName) {
  const result = await s3.listObjectsV2({
    Bucket: bucketName,
    ExpectedBucketOwner: process.env.SourceAccount
  }).promise()

  console.log(`result: ${inspectStringify(result)}`)
  const keys = result.Contents.map((obj) => {
    console.log(`obj: ${inspectStringify(obj)}`)
    return { Key: obj.Key }
  })

  if (keys.length) {
    console.log(`Attempting to delete ${keys.length} objects. The first one in the list is: ${keys[0].Key}`)
    const result = await s3.deleteObjects({
      Bucket: bucketName,
      Delete: {
        Objects: keys
      },
      ExpectedBucketOwner: process.env.SourceAccount
    }).promise()
    console.log(`deleteObjects result: ${inspectStringify(result)}`)
  }
}