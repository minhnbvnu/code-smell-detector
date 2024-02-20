async function tryToPreventNetlifyBuildTimeout(dateTestsStarted, numberOfUrls, estimatedTimePerBuild = ESTIMATED_MAX_TIME_PER_TEST) {
	let minutesRemaining = NETLIFY_MAX_LIMIT - (Date.now() - dateTestsStarted)/(1000*60);
	if(process.env.CONTEXT &&
		process.env.CONTEXT === "production" &&
		NETLIFY_MAX_LIMIT &&
		minutesRemaining < numberOfUrls * estimatedTimePerBuild) {
		console.log( `run-tests has about ${minutesRemaining} minutes left, but the next run has ${numberOfUrls} urls. Saving it for the next build.` );
		return true;
	}
	return false;
}