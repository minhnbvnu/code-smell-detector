function updateTray() {
	currentPath().then(dir => {
		setTimeout(updateTray, TRAY_UPDATE_INTERVAL);
		setActiveProject(dir);
	});
}