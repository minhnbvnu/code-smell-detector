function setupBattery() {
		
	window.addEventListener("batterystatus", function(info) {
		console.log("[batterystatus event] Level: " + info.level + " isPlugged: " + info.isPlugged);
	}, false);
	
	window.addEventListener("batterylow", function(info) {
		console.log("[batterylow event] Level: " + info.level);
	}, false);

}