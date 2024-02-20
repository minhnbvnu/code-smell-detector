async function fetchRepoInfo(repo) {
	const response = await fetch(`https://api.github.com/repos/${repo}`,
		localStorage.token ? {
			headers: {
				Authorization: `Bearer ${localStorage.token}`,
			},
		} : {},
	);

	switch (response.status) {
		case 401: {
			updateStatus('⚠ The token provided is invalid or has been revoked.', {token: localStorage.token});
			throw new Error('Invalid token');
		}

		case 403: {
			// See https://developer.github.com/v3/#rate-limiting
			if (response.headers.get('X-RateLimit-Remaining') === '0') {
				updateStatus('⚠ Your token rate limit has been exceeded.', {token: localStorage.token});
				throw new Error('Rate limit exceeded');
			}

			break;
		}

		case 404: {
			updateStatus('⚠ Repository was not found.', {repo});
			throw new Error('Repository not found');
		}

		default:
	}

	if (!response.ok) {
		updateStatus('⚠ Could not obtain repository data from the GitHub API.', {repo, response});
		throw new Error('Fetch error');
	}

	return response.json();
}