async function auroraPostData(jsonData) {
	const client = new RDSDataClient({
		region: AWS_REGION,
		credentialDefaultProvider: myCredentialProvider,
	});

	const keysArray = Object.keys(jsonData);
	let keys = '';
	let values = '';

	keysArray.forEach((key, index) => {
		keys += `${key}`;
		values += `'${jsonData[key]}'`;

		if (index !== keysArray.length - 1) {
			keys += ', ';
			values += ', ';
		}
	});

	const call = new ExecuteStatementCommand({
		// IMPORTANT: This is NOT production ready!
		// This SQL command is susceptible to SQL Injections
		sql: `INSERT INTO ${AWS_AURORA_TABLE}(${keys}) VALUES (${values});`,
		resourceArn: AWS_AURORA_RESOURCE_ARN,
		secretArn: AWS_AURORA_SECRET_ARN,
	});

	const results = await client.send(call);

	return results;
}