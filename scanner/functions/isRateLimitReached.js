async function isRateLimitReached(nbToPerform) {
	const remaining = await axios.get('/rate_limit')
	if (remaining.data.resources.core.remaining < nbToPerform) {
		console.error(`💔 GitHub Rate Limit Reached. Reset at ${new Date(remaining.data.resources.core.reset * 1000).toLocaleTimeString()}`);
		return true;
	}
	return false;
}