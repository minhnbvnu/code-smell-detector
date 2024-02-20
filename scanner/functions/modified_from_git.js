function modified_from_git(file) {
	var proc_result = child_process.spawnSync("git", ["diff-index", "HEAD", file]);

	return proc_result.stdout.length > 0;
}