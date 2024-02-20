async function myCredentialProvider() {
	return {
		// use wrangler secrets to provide these global variables
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	};
}