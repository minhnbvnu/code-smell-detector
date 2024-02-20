function computeUpperUrl (baseUrl) {
    if (baseUrl.substr(0, 6) === 'about:')
      return null;
		// Valid baseUrl making an URL
		let url = null;
		try {
			url = new URL(baseUrl);
		} catch (exception) {
			return null;
		}

    // Get anchor index
    let indexAnchor = baseUrl.lastIndexOf('#');
    if (indexAnchor !== -1) {
      if (++indexAnchor != baseUrl.length)
        return baseUrl.substring(0, indexAnchor);
      else
        return baseUrl.substring(0, indexAnchor - 1);
    }

    // Get GET parameters index
    let indexGetParams = baseUrl.indexOf('?');
    if (indexGetParams !== -1) {
      // Get GET parameters separator index
      let indexGetSeparator = baseUrl.lastIndexOf('&');
      if (indexGetSeparator !== -1 && indexGetSeparator > indexGetParams) {
        while(baseUrl.match(/.+[=&]/g)){
          baseUrl = baseUrl.slice(0,-1);
          if(baseUrl.match(/.+[=&]/g))
            return baseUrl.match(/.+[=&]/g)[0];
          else
            return baseUrl.match(/.+\?/g)[0];
        }
      }
      // Return URL without GET parameters
      return baseUrl.substring(0, indexGetParams);
    }

		// Try to go one directory up
		if (baseUrl.charAt(baseUrl.length - 1) === '/') {
			// Get one directory up URL
			let resolvedUrl = new URL('..', baseUrl).href;
			// Check the URL resolution
			if (baseUrl != resolvedUrl && resolvedUrl.substr(resolvedUrl.length - 2, 2) != '..' && resolvedUrl.substr(resolvedUrl.length - 3, 3) != '../') {
				// Return one directory up URL
				return resolvedUrl;
			}
		}
		// Try to resolve current place
		else {
			let resolvedUrl = new URL('.', baseUrl).href;
			if (resolvedUrl !== baseUrl) {
				return resolvedUrl;
			}
		}
		// Get domain URI
		let domain = url.host;
		// Check if domain is IPv4 URL
		if (domain.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
			return null;
		}
		// Compute upper domain
		let upperDomain = domain.replace(/.*?\./, '');
		// Get dot matches
		let dotMatches = upperDomain.match(/\./g);
		// Check computed upper domain
		if (upperDomain == domain || dotMatches === null) {
			return null;
		}
		// Get URL scheme
		let scheme = url.scheme;
		// Declare resolved URL
		let resolvedUrl = null;
		// Check top level domain name
		if (dotMatches.length <= 1) {
			// Add default www subdomain to TLD name
			resolvedUrl = scheme + '://www.' + upperDomain + '/';
		} else {
			// Resolve URL from upper domain
			resolvedUrl = scheme + '://' + upperDomain + '/';
		}
		// Check resolved URL
		if (resolvedUrl == baseUrl) {
			return null;
		}
		// Return resolved URL
		return resolvedUrl;
	}