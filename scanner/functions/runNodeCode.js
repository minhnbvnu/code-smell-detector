async function runNodeCode() {

	var buffer = await fs.readFile(imageUrl)
	await runExperiment(buffer, 'buffer')

	await runExperiment(imageUrl, 'filepath')

}