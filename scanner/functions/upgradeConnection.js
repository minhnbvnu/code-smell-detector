function upgradeConnection(success, failure) {
		if (location.protocol == "http:") {
			var httpRequest;

			if (window.XMLHttpRequest) {
				httpRequest = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			httpRequest.onreadystatechange = function() {
				if (httpRequest.readyState == 4) {
					if (httpRequest.status >= 200 && httpRequest.status < 400) {
						success();
					} else {
						failure();
					}
				}
			}

			httpRequest.open('GET','https://' + location.hostname + '/assets/upgrade', true);
			httpRequest.send();

			return;
		}
		
		failure();
	}