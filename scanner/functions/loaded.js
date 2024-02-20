function loaded() {
	port.postMessage("get-stuff");
	port.onMessage.addListener(function(msg) {
		console.log("message recieved yea: ", msg);
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			selectedId = tabs[0].id;
			listListeners(msg.listeners[selectedId]);
		});
	});
}