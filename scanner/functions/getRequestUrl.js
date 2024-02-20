function getRequestUrl(provider, externalUrl) {

	        var url = provider.apiendpoint, qs = "", callbackparameter = provider.callbackparameter || "callback", i;

	        if (url.indexOf("?") <= 0)
	            url = url + "?";
	        else
	            url = url + "&";

	        if (provider.maxWidth != null && provider.params["maxwidth"] == null)
	            provider.params["maxwidth"] = provider.maxWidth;

	        if (provider.maxHeight != null && provider.params["maxheight"] == null)
	            provider.params["maxheight"] = provider.maxHeight;

	        for (i in provider.params) {
	            // We don't want them to jack everything up by changing the callback parameter
	            if (i == provider.callbackparameter)
	                continue;

	            // allows the options to be set to null, don't send null values to the server as parameters
	            if (provider.params[i] != null)
	                qs += "&" + escape(i) + "=" + provider.params[i];
	        }

	        url += "format=json&url=" + escape(externalUrl) +
						qs +
						"&" + callbackparameter + "=?";

			return url;
		}