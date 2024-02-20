async function sqsExample() {
	const client = new SQSClient({
		region: AWS_REGION,
		credentialDefaultProvider: myCredentialProvider,
	});

	const send = new SendMessageCommand({
		// use wrangler secrets to provide this global variable
		QueueUrl: AWS_SQS_QUEUE_URL,
		MessageBody: 'Hello SQS from a Cloudflare Worker',
	});

	return client.send(send);
}