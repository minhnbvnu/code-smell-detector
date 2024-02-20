function withFilesystem(callback) {
	if (__fs_initialized) {
		callback();
	} else if (__fs_errored) {
		alert("The filesystem is not available. It failed to initialize.");
	} else if (__fs_timed_out) {
		alert("The filesystem is not working.");
	} else {
		// wait within a global period of time while it should be configuring (and not show a message box)
		// TODO: hm, maybe a global timeout isn't what we want
		// The desktop should load, regardless of how long it takes.
		// Other operations could fail in a second or more. Depending on the operation.
		__fs_waiting_callbacks.push(callback);
	}
}