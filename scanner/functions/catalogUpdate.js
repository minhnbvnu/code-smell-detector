async function catalogUpdate () {
  console.log('awaiting catalog update')

  // This will end up invoked twice, but I'd like to be able to track how long it takes to
  // update. Ideally, I would also prevent executing the lambda from the S3 side as well, but
  // that's not as easy as it sounds.
  await util.lambda.invoke({
    FunctionName: process.env.CatalogUpdaterFunctionArn,
    // this API would be more performant if we moved to 'Event' invocations, but then we couldn't signal to
    // admins when the catalog updater failed to update the catalog; they'd see a 200 and then no change in
    // behavior.
    InvocationType: 'RequestResponse',
    LogType: 'None'
  }).promise()
}