function setEventSourceAttributes(event, attributes) {
  if (event.Records) {
    const record = event.Records[0]
    if (record.eventSourceARN) {
      // SQS/Kinesis Stream/DynamoDB/CodeCommit
      attributes[EVENT_SOURCE_ARN_KEY] = record.eventSourceARN
    } else if (record.s3 && record.s3.bucket && record.s3.bucket.arn) {
      // S3
      attributes[EVENT_SOURCE_ARN_KEY] = record.s3.bucket.arn
    } else if (record.EventSubscriptionArn) {
      // SNS
      attributes[EVENT_SOURCE_ARN_KEY] = record.EventSubscriptionArn
    } else {
      logger.trace('Unable to determine ARN from event record.', event, record)
    }
  } else if (event.records && event.deliveryStreamArn) {
    // Kinesis Firehose
    attributes[EVENT_SOURCE_ARN_KEY] = event.deliveryStreamArn
  } else if (
    event.requestContext &&
    event.requestContext.elb &&
    event.requestContext.elb.targetGroupArn
  ) {
    attributes[EVENT_SOURCE_ARN_KEY] = event.requestContext.elb.targetGroupArn
  } else if (event.resources && event.resources[0]) {
    attributes[EVENT_SOURCE_ARN_KEY] = event.resources[0]
  } else {
    logger.trace('Unable to determine ARN for event type.', event)
  }
}