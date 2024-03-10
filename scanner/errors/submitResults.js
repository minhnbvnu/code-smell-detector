function submitResults(r, c) {
		var parameters = decodeParameters();
		var identifier = typeof parameters.identifier != 'undefined' ? parameters.identifier : '';
		var source = typeof parameters.source != 'undefined' ? parameters.source : '';
		var task = typeof parameters.task != 'undefined' ? parameters.task : '';

		try {
			var payload = '{' +
						'"release": "' + r.release + '",' +
						'"source": "' + source + '",' +
						'"protocol": "' + location.protocol + '",' +
						'"identifier": "' + escapeSlashes(identifier) + '",' +
						'"task": "' + task + '",' +
						'"uniqueid": "' + r.uniqueid + '",' +
						'"score": ' + c.score + ',' +
						'"maximum": ' + c.maximum + ',' +
						'"camouflage": "' + (Browsers.camouflage ? '1' : '0') + '",' +
						'"features": "' + (Browsers.features.join(',')) + '",' +
						'"browserName": "' + (Browsers.browser.name ? Browsers.browser.name : '') + '",' +
						'"browserChannel": "' + (Browsers.browser.channel ? Browsers.browser.channel : '') + '",' +
						'"browserVersion": "' + (Browsers.browser.version ? Browsers.browser.version.toString() : '') + '",' +
						'"browserVersionType": "' + (Browsers.browser.version ? Browsers.browser.version.type : '') + '",' +
						'"browserVersionMajor": "' + (Browsers.browser.version ? Browsers.browser.version.major : '') + '",' +
						'"browserVersionMinor": "' + (Browsers.browser.version ? Browsers.browser.version.minor : '') + '",' +
						'"browserVersionOriginal": "' + (Browsers.browser.version ? Browsers.browser.version.original : '') + '",' +
						'"browserMode": "' + (Browsers.browser.mode ? Browsers.browser.mode : '') + '",' +
						'"engineName": "' + (Browsers.engine.name ? Browsers.engine.name : '') + '",' +
						'"engineVersion": "' + (Browsers.engine.version ? Browsers.engine.version.toString() : '') + '",' +
						'"osName": "' + (Browsers.os.name ? Browsers.os.name : '') + '",' +
						'"osFamily": "' + (Browsers.os.family ? Browsers.os.family : '') + '",' +
						'"osVersion": "' + (Browsers.os.version ? Browsers.os.version.toString() : '') + '",' +
						'"deviceManufacturer": "' + (Browsers.device.manufacturer ? Browsers.device.manufacturer : '') + '",' +
						'"deviceModel": "' + (Browsers.device.model ? Browsers.device.model : '') + '",' +
						'"deviceSeries": "' + (Browsers.device.series ? Browsers.device.series : '') + '",' +
						'"deviceType": "' + (Browsers.device.type ? Browsers.device.type : '') + '",' +
						'"deviceIdentified": "' + (Browsers.device.identified ? '1' : '0' ) + '",' +
						'"deviceWidth": "' + (screen.width) + '",' +
						'"deviceHeight": "' + (screen.height) + '",' +
						'"useragent": "' + navigator.userAgent + '",' +
						'"humanReadable": "' + Browsers.toString() + '",' +
						'"points": "' + c.points + '",' +
						'"results": "' + r.results + '"' +
						'}';

			submit('submit', payload);
		} catch(e) {
			alert('Could not submit results: ' + e.message);
		}
	}