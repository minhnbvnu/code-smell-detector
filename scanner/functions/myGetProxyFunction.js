function myGetProxyFunction (data) {
	// Updates proxy_display based on current sequence's value.
	var boilerPlate		   = "Proxies enabled for sequence: ";
	var proxy_display	   = document.getElementById("proxies_on");

	if (proxy_display !== null) {
		proxy_display.innerHTML = boilerPlate + data;
	}
}