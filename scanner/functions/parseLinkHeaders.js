function parseLinkHeaders(headers) {
			var links = [];
			[].concat(headers).forEach(function (header) {
				try {
					links = links.concat(rfc5988LinkParser.parse(header));
				}
				catch (e) {
					// ignore
					// TODO consider a debug mode that logs
				}
			});
			return links;
		}