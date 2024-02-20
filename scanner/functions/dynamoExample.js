async function dynamoExample() {
	const client = new DynamoDBClient({
		region: AWS_REGION,
		credentialDefaultProvider: myCredentialProvider,
	});

	// replace with your table name and key as appropriate
	const put = new PutItemCommand({
		TableName: AWS_DYNAMO_TABLE,
		Item: {
			greeting: { S: 'Hello!' },
			[AWS_DYNAMO_PRIMARYKEY]: { S: 'world' },
		},
	});
	await client.send(put);
	const get = new GetItemCommand({
		TableName: AWS_DYNAMO_TABLE,
		Key: {
			[AWS_DYNAMO_PRIMARYKEY]: { S: 'world' },
		},
	});
	const results = await client.send(get);
	return results.Item;
}