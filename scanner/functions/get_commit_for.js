function get_commit_for(file) {
	var proc_result = child_process.spawnSync("git", ["log", "-1", file]);

	var stdout = proc_result.stdout.toString();

	var commit = stdout.match(/^commit ([0-9a-f]{20,})/);
	if (!commit) {
		return null;
	}

	return commit[1];
}