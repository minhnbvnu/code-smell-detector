async function writeFilesPromise(posts, config) {
	await writeMarkdownFilesPromise(posts, config);
	await writeImageFilesPromise(posts, config);
}