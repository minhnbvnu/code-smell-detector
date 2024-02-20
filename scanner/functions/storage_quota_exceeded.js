async function storage_quota_exceeded(){
	if($quota_exceeded_window){
		$quota_exceeded_window.close();
		$quota_exceeded_window = null;
	}
	if(ignoring_quota_exceeded){
		return;
	}
	const { promise, $window } = showMessageBox({
		title: "Storage Error",
		messageHTML: `
			<p>JS Paint stores images as you work on them so that if you close your browser or tab or reload the page your images are usually safe.</p>
			<p>However, it has run out of space to do so.</p>
			<p>You can still save the current image with <b>File > Save</b>. You should save frequently, or free up enough space to keep the image safe.</p>
		`,
		buttons: [
			{ label: "Manage Storage", value: "manage", default: true },
			{ label: "Ignore", value: "ignore" },
		],
		iconID: "warning",
	});
	$quota_exceeded_window = $window;
	const result = await promise;
	if (result === "ignore") {
		ignoring_quota_exceeded = true;
	} else if (result === "manage") {
		ignoring_quota_exceeded = false;
		manage_storage();
	}
}