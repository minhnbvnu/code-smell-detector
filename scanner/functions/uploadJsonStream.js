async function uploadJsonStream ({ event, file, hwm }, init) {
  const callerIdentity = await sts.getCallerIdentity({}).promise()

  console.log(`Creating stream to s3://${event.Bucket}/${file}`)
  const uploadStream = new PassThrough({ writableHighWaterMark: hwm })
  const uploadPromise = s3.upload({
    Bucket: event.Bucket,
    Key: file,
    Body: uploadStream,
    ExpectedBucketOwner: callerIdentity.Account
  }).promise()

  try {
    await init(item => {
      uploadStream.write(JSON.stringify(item) + '\n')
    })
  } finally {
    uploadStream.end()
    console.log(`Closing stream for s3://${event.Bucket}/${file}`)
    await uploadPromise
  }
}