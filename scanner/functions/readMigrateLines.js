function readMigrateLines (event, file) {
  console.log('Reading lines from migration file')

  return new Promise((resolve, reject) => {
    const downloadReq = s3.getObject({
      Bucket: event.Bucket,
      Key: file,
      ExpectedBucketOwner: sourceAccount
    })

    downloadReq.on('httpHeaders', (statusCode, httpHeaders) => {
      console.log('statusCode:', statusCode)
      console.log('httpHeaders:', httpHeaders)

      if ((statusCode >= 200 && statusCode < 300) || statusCode === 304) {
        resolve(lineStream)
      } else {
        reject(new Error('Network error'))
      }
    })

    const bufferedStream = new PassThrough({
      // Set a much higher high water mark than the default - this is only used once, and the
      // pipeline will likely consume data slower than it's received due to parsing overhead.
      writableHighWaterMark: 32 /* MB */ * 1024 /* KB */ * 1024 /* B */
    })

    const lineStream = readline.createInterface({
      input: bufferedStream,
      crlfDelay: Infinity
    })

    downloadReq.createReadStream()
      .on('error', e => { bufferedStream.destroy(e) })
      .pipe(bufferedStream)
  })
}