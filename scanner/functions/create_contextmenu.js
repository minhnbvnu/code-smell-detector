function create_contextmenu() {
	if (contextmenu)
		return;

	contextmenu = chrome.contextMenus.create({
		title: "Try to find larger image (IMU)",
		contexts: ["page", "link", "image", "video", "audio"],
		onclick: contextmenu_imu
	});
}