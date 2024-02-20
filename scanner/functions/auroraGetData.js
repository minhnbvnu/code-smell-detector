async function auroraGetData(ID) {
	const client = new RDSDataClient({
		region: AWS_REGION,
		credentialDefaultProvider: myCredentialProvider,
	});

	const call = new ExecuteStatementCommand({
		// IMPORTANT: This is NOT production ready!
		// This SQL command is susceptible to SQL Injections
		sql: `SELECT * FROM ${AWS_AURORA_TABLE} WHERE id = ${ID};`,
		resourceArn: AWS_AURORA_RESOURCE_ARN,
		secretArn: AWS_AURORA_SECRET_ARN,
	});

	const results = await client.send(call);

	return results.records;
}