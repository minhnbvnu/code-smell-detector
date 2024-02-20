function startConversion(path) {
	vlog(1, `Starting conversion`);
	const output = convertDirectory(exportPath);

	vlog(1,
		`Fixed in ${output.elapsed}ms
${'-'.repeat(8)}
Directories: ${output.directories.length}
Files: ${output.files.length}
Markdown Links: ${output.markdownLinks}
CSV Links: ${output.csvLinks}`
	);
}