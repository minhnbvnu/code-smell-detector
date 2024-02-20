async function maybeResponseLfs(response) {
	const length = Number(response.headers.get('content-length'));
	if (length > 128 && length < 140) {
		const contents = await response.clone().text();
		return contents.startsWith('version https://git-lfs.github.com/spec/v1');
	}
}