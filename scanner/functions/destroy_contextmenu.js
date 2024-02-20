function destroy_contextmenu() {
	chrome.contextMenus.removeAll();
	contextmenu = null;
}